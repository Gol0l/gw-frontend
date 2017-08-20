import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Model} from './ModelClasses/Model.js';


var mapWidth = 2000;
var mapHeight = 2000;
var model = new Model(2000, 2000)


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
    system.addPlanet("planet" + (i + 1), planet.id, "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png')
  }
  ReactDOM.render(<App model = {model}/>, document.getElementById('root'));
}

function oldInit() {
  model.addSystem("star1", "idstar1", 350, 300);
  model.addSystem("star2", "idstar2", 550, 350);
  model.addSystem("star3", "idstar3", 480, 300);
  model.addSystem("star4", "idstar4", 200, 130);
  model.systemsList[0].neighbours.push("idstar2");
  model.systemsList[0].neighbours.push("idstar3");
  model.systemsList[0].neighbours.push("idstar4");
  model.systemsList[1].neighbours.push("idstar1");
  model.systemsList[2].neighbours.push("idstar1");
  model.systemsList[2].addPlanet("planet1", "idplanet7", "cybran", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');
  model.systemsList[3].neighbours.push("idstar1");
  model.systemsList[3].addPlanet("planet1", "idplanet8", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');


  model.systemsList[0].addPlanet("planet1", "idplanet1", "cybran", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');
  model.systemsList[0].addPlanet("planet2", "idplanet2", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');
  model.systemsList[0].addPlanet("planet3", "idplanet3", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');

  model.systemsList[0].planetList[0].currentBattle.status = "lobby";
  model.systemsList[0].planetList[0].currentBattle.battleParticipants = [{factionName: "aeon", players: ["user", "playerB", "playerC"]}, {factionName: "cybran", players: ["playerD", "playerE"]}];
  model.systemsList[0].planetList[0].currentBattle.timeToBattle = 0;

  model.systemsList[0].planetList[2].currentBattle.status = "lobby";
  model.systemsList[0].planetList[2].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC", "playerD"]}, {factionName: "cybran", players: ["playerD", "playerE"]}];
  model.systemsList[0].planetList[2].currentBattle.timeToBattle = 0;

  model.systemsList[1].addPlanet("planet4", "idplanet4", "aeon", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');
  model.systemsList[1].addPlanet("planet5", "idplanet5", "uef", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');
  model.systemsList[1].addPlanet("planet6", "idplanet6", "seraphim", {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png');

  model.systemsList[1].planetList[0].currentBattle.status = "battle";
  model.systemsList[1].planetList[0].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC"]}, {factionName: "uef", players: ["playerD", "playerE"]}];
  model.systemsList[1].planetList[0].currentBattle.timeToBattle = 0;

  model.systemsList[1].planetList[2].currentBattle.status = "lobby";
  model.systemsList[1].planetList[2].currentBattle.battleParticipants = [{factionName: "aeon", players: ["playerA", "playerB", "playerC"]}, {factionName: "seraphim", players: ["playerD", "playerE"]}];
  model.systemsList[1].planetList[2].currentBattle.timeToBattle = 0;


  model.playerInfo.name = "user";
  model.playerInfo.faction = "aeon";
  model.playerInfo.isLoggedIn = true;
  model.playerInfo.readyForBattle = true;
  ReactDOM.render(<App model = {model}/>, document.getElementById('root'));
}


network.setDomain("localhost:8080");
// Fallbacks to default model if it can't reach the backend.
network.getSolarSystems(newInit, oldInit)



registerServiceWorker();
