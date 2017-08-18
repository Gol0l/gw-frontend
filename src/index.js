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

    this.getPlanets = function(successCallback, failCallback) {
        var planet_url = "http://" + private_.domain + "/data/planet";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(response) {
            if (this.readyState == 4 && this.status == 200) {
               var json = JSON.parse(xhttp.responseText);
               successCallback(json.data);
            } else if (this.readyState == 4) {
              failCallback();
            }
        };
        xhttp.open("GET", planet_url);
        xhttp.send();
    };
})();

function newInit(planets) {
  console.log(planets)

  var solarSystems = {}

  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i]
    if (solarSystems[planet.relationships.solarSystem.data.id] === undefined) {
      var index = model.systemsList.length
        solarSystems[planet.relationships.solarSystem.data.id] = index;
      model.addSystem("star" + index, planet.relationships.solarSystem.data.id, (100 + 713 * index + 124 * index * index) % 400, (100 + 513 * index + 284 * index * index) % 400);
    }
    var system = model.systemsList[solarSystems[planet.relationships.solarSystem.data.id]]
    var attr = planet.attributes
    console.log(attr)
    system.addPlanet("planet" + (i + 1), planet.id, attr.currentOwner, {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8}, 'planetSprites1.png')
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
network.getPlanets(newInit, oldInit)




registerServiceWorker();
