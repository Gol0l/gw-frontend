import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Model} from './modelclasses/Model.js';
import {handleFunctionDict} from './network/messageHandlers.js'
import {Connector} from './network/Connector.js'

var mapWidth = 2000;
var mapHeight = 2000;
var model = new Model(2000, 2000)


var gololInit = function(model) {
   console.log("thisismyinit")

   var user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjogMSwgInVzZXJfbmFtZSI6ICJVRUYgQWxwaGEiLCAiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sICJleHAiOiA0MTAyNDQ0NzQwfQ.qlA-HIEU9zQ7OA_eAqfYAG5MZmhe7TBqV9zVnJgV2wY"
   var network = new Connector("localhost:8080");


   var dataCharacters = network.dataRequest("gwCharacter");
   model.generateCharacterDict(dataCharacters, network);

   var dataSystems = network.dataRequest("solarSystem");
   var dataPlanets = network.dataRequest("planet");
   var dataBattles = network.dataRequest("battle?filter=status!=FINISHED");


   var dataPlanetsDict = {}
   for (var i = 0; i < dataPlanets.length; i++) {
      dataPlanetsDict[dataPlanets[i].id] = dataPlanets[i];
   }
   var planetToBattleDict = {};
   for (var i = 0; i < dataBattles.length; i++) {
      planetToBattleDict[dataBattles[i].relationships.planet.data.id] = dataBattles[i];
   }


   for (var i = 0; i < dataSystems.length; i++) {
      var sys = dataSystems[i];
      model.systemsList.addSystem(  sys.attributes.name,
                                    sys.id,
                                    sys.attributes.y,
                                    sys.attributes.x);
      for (var j = 0; j < sys.relationships.connectedSystems.data.length; j++) {
         model.systemsList[i].neighbours.push(sys.relationships.connectedSystems.data.id);
      }

      for (var j = 0; j < sys.relationships.planets.data.length; j++) {

         var currentPlanetId = sys.relationships.planets.data.id;

         model.systemsList[i].addPlanet(  dataPlanetsDict[currentPlanetId].attributes.name,
                                          dataPlanetsDict[currentPlanetId].id,
                                          dataPlanetsDict[currentPlanetId].attributes.currentOwner,
                                          {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8},
                                          dataPlanets[currentPlanetId].relationships.map.data.id,
                                          'planetSprites1.png');

         var currentPlanet = model.systemsList[i].planetList[model.systemsList[i].planetList.length - 1];
         if (currentPlanetId in planetToBattleDict) {

            currentPlanet.currentBattle.id = planetToBattleDict[currentPlanetId].id;
            currentPlanet.currentBattle.waitingProgress = planetToBattleDict[currentPlanetId].attributes.waitingProgress;

            if (planetToBattleDict[currentPlanetId].attributes.status == "INITIATED") {
               currentPlanet.currentBattle.status = "lobby";
            }
            else if (planetToBattleDict[currentPlanetId].attributes.status == "FINISHED") {
               console.log("there shouldnt be any finished battes, Ill display battle");
               currentPlanet.currentBattle.status = "battle";
            }
            currentPlanet.currentBattle.battleParticipants.push({ factionName: planetToBattleDict[currentPlanetId].attributes.defendingFaction,
                                                                  players: []});
            currentPlanet.currentBattle.battleParticipants.push({ factionName: planetToBattleDict[currentPlanetId].attributes.attackingFaction,
                                                                  players: []});
            currentPlanet.currentBattle.battleParticipantsUnique.push({ factionName: planetToBattleDict[currentPlanetId].attributes.defendingFaction,
                                                                  players: []});
            currentPlanet.currentBattle.battleParticipantsUnique.push({ factionName: planetToBattleDict[currentPlanetId].attributes.attackingFaction,
                                                                  players: []});

            var participantList = planetToBattleDict[currentPlanetId].relationships.participants.data
            for (var k = 0; k < participantList.length; k++) {

               for (var l = 0; l < 2; l++) {
                  if (currentPlanet.currentBattle.battleParticipantsUnique[l].factionName == model.characterDict.getChar(participantList[k].id).faction) {
                     currentPlanet.currentBattle.battleParticipantsUnique[l].players.push(participantList[k].id)
                     currentPlanet.currentBattle.battleParticipants[l].players.push(model.characterDict.getChar(participantList[k].id).name)
                  }
               }
            }
         }
      }
   }

   network.setupSocket(user_token, handleFunctionDict);

   model.playerInfo.id = "userId";
   model.playerInfo.displayName = "user";
   model.playerInfo.faction = "uef";
   model.playerInfo.isLoggedIn = true;
   model.playerInfo.hasCharacter = true;
   model.playerInfo.readyForBattle = true;
   ReactDOM.render(<App model = {model}/>, document.getElementById('root'));
}

var network = new (function() {

    var private_ = {};

    this.setDomain = function(domain) {
        private_.domain = domain;
    };

    this.Session = function(user_token, ws_handlers) {
        var ws_url = "ws://" + private_.domain + "/websocket?accessToken=" + user_token;
        var socket = new WebSocket(ws_url);
        socket.onmessage = function (event) {
            var data = JSON.parse(event.data);
            var handler = ws_handlers[data.action];
            if (handler) {

                handler(data.data);
            } else {
                console.log("No handler registered for this message: " + data.action);
                console.log(data);
            }
        };
    };

    private_.n = 0

    this.getPlanets = function(successCallback, failCallback) {
        var planet_url = "http://" + private_.domain + "/data/planet";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(response) {
            if (this.readyState == 4 && this.status == 200) {
               private_.planets = JSON.parse(xhttp.responseText);
               if (++private_.n == 2)
                 successCallback(private_.solarSystems, private_.planets)
            }
        };
        xhttp.open("GET", planet_url);
        xhttp.send();
    };

    this.getSolarSystems = function(successCallback, failCallback) {
        this.getPlanets(successCallback, failCallback)
        var planet_url = "http://" + private_.domain + "/data/solarSystem";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(response) {
            if (this.readyState == 4 && this.status == 200) {
               private_.solarSystems = JSON.parse(xhttp.responseText);
               if (++private_.n == 2)
                 successCallback(private_.solarSystems.data, private_.planets.data)
            } else if (this.readyState == 4) {
              failCallback();
            }
        };
        xhttp.open("GET", planet_url);
        xhttp.send();
    };
})();

function newInit(solarSystems, planets) {
  console.log("Solar Systems:")
  console.log(solarSystems)
  console.log("Planets:")
  console.log(planets)
  var solarSystemIndexes = {}

  for (var i = 0; i < solarSystems.length; i++) {
    var solarSystem = solarSystems[i]
    solarSystemIndexes[solarSystem.id] = i;
    model.addSystem(solarSystem.attributes.name, solarSystem.id, solarSystem.attributes.x * 20, solarSystem.attributes.y * 20)
  }

  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i]
    var systemId = solarSystemIndexes[planet.relationships.solarSystem.data.id]
    var system = model.systemsList[systemId]
    var attr = planet.attributes
    system.addPlanet("planet" + (i + 1), planet.id, "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png')
  }
  ReactDOM.render(<App model = {model}/>, document.getElementById('root'));
}

function oldInit() {
  console.log("thisisthenewbuild2")
  model.addSystem("star1", "idstar1", 350, 300);
  model.addSystem("star2", "idstar2", 550, 350);
  model.addSystem("star3", "idstar3", 480, 300);
  model.addSystem("star4", "idstar4", 200, 130);
  for (var i = 0; i < 300; i++) {
   model.addSystem("genstar" + i.toString(), "idgenstar" + i.toString(), (i * 5) % 100, i*5);
   model.systemsList[i].neighbours.push("idgenstar2");
   model.systemsList[i].neighbours.push("idgenstar9");
   model.systemsList[i].neighbours.push("idgenstar15");
   model.systemsList[i].addPlanet("planet1", "idgenerplanet" + i.toString(), "seraphim", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');


  }
  model.systemsList[0].neighbours.push("idstar2");
  model.systemsList[0].neighbours.push("idstar3");
  model.systemsList[0].neighbours.push("idstar4");
  model.systemsList[1].neighbours.push("idstar1");
  model.systemsList[2].neighbours.push("idstar1");
  model.systemsList[2].addPlanet("planet1", "idplanet7", "cybran", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');
  model.systemsList[3].neighbours.push("idstar1");
  model.systemsList[3].addPlanet("planet1", "idplanet8", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');


  model.systemsList[0].addPlanet("planet1", "idplanet1", "cybran", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');
  model.systemsList[0].addPlanet("planet2", "idplanet2", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');
  model.systemsList[0].addPlanet("planet3", "idplanet3", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');

  model.systemsList[0].planetList[0].currentBattle.status = "lobby";
  model.systemsList[0].planetList[0].currentBattle.battleParticipants = [{factionName: "aeon", players: ["user", "playerB", "playerC"]}, {factionName: "cybran", players: ["playerD", "playerE"]}];
  model.systemsList[0].planetList[0].currentBattle.waitingProgress = 0;

  model.systemsList[0].planetList[2].currentBattle.status = "lobby";
  model.systemsList[0].planetList[2].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC", "playerD"]}, {factionName: "cybran", players: ["playerD", "playerE"]}];
  model.systemsList[0].planetList[2].currentBattle.waitingProgress = 0;

  model.systemsList[1].addPlanet("planet4", "idplanet4", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');
  model.systemsList[1].addPlanet("planet5", "idplanet5", "uef", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');
  model.systemsList[1].addPlanet("planet6", "idplanet6", "seraphim", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, "setonsId", 'planetSprites1.png');

  model.systemsList[1].planetList[0].currentBattle.status = "battle";
  model.systemsList[1].planetList[0].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC"]}, {factionName: "uef", players: ["playerD", "playerE"]}];
  model.systemsList[1].planetList[0].currentBattle.waitingProgress = 0;
  model.systemsList[1].planetList[0].distance = 1;

  model.systemsList[1].planetList[1].currentBattle.status = "lobby";
  model.systemsList[1].planetList[1].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC"]}, {factionName: "seraphim", players: ["playerD", "playerE"]}];
  model.systemsList[1].planetList[1].currentBattle.waitingProgress = 0;


  model.playerInfo.id = "userId";
  model.playerInfo.displayName = "user";
  model.playerInfo.faction = "uef";
  model.playerInfo.isLoggedIn = true;
  model.playerInfo.hasCharacter = true;
  model.playerInfo.readyForBattle = true;
  ReactDOM.render(<App model = {model}/>, document.getElementById('root'));
}


network.setDomain("localhost:8080");
// Fallbacks to default model if it can't reach the backend.
network.getSolarSystems(newInit, oldInit)



registerServiceWorker();
