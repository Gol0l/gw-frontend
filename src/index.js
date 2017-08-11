import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Model} from './ModelClasses/Model.js';


var mapWidth = 2000;
var mapHeight = 2000;
var model = new Model(2000, 2000)

model.addSystem("star1", "idstar1", 350, 300);
model.addSystem("star2", "idstar2", 550, 350);

model.systemsList[0].neighbours.push("idstar2");
model.systemsList[1].neighbours.push("idstar1");

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
registerServiceWorker();
