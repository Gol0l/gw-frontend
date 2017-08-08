import React, { Component } from 'react';
import {GalaxyMap} from './components/GalaxyMap.js';
import {InpGalaxyMap} from './inpclasses/InpGalaxyMap.js';
import {MapPreview} from './components/MapPreview.js';
import {InpMapPreview} from './inpclasses/InpMapPreview.js'
import {BattleLobby} from './components/BattleLobby.js';
import {InpBattleLobby} from './inpclasses/InpBattleLobby.js'
import {ActionButton} from './components/ActionButton.js';
import {InpActionButton} from './inpclasses/InpActionButton.js'


class App extends Component {
   constructor(props) {

      super(props);
      const length = 0;

      this.state = {
         width: window.innerWidth, height: window.innerHeight,
         mapWidth: this.props.model.mapWidth, mapHeight: this.props.model.mapHeight,
         frameDim: {leftSize: 0, topSize: 0, rightSize: 0, bottomSize: 0},
         simSettings: this.props.model.simSettings,
         systemsList: this.props.model.systemsList,
         playerInfo: this.props.model.playerInfo,
         selection: {systemName: "none", planetName: "none", planetRect: "none"}

      };

      this.planetOnClick = this.planetOnClick.bind(this);

      this.buttonAttack = this.buttonAttack.bind(this);
      this.buttonCantAttack = this.buttonCantAttack.bind(this);
      this.buttonError = this.buttonError.bind(this);
      this.buttonNoDisplay = this.buttonNoDisplay.bind(this);

   }


   planetOnClick(systemName, name, rect) {
      this.setState({selection: {systemName: systemName, planetName: name, planetRect: rect}});
   }

   buttonAttack = function() {
      alert('attacking/joining the battle for this planet')
   }
   buttonCantAttack = function() {
      alert('cant attack/join the battle for this planet!')
   }
   buttonError = function() {
      alert('error: planet status not proper?')
   }
   buttonNoDisplay = function() {
      alert('how did you click something that isnt supposed to be displayed')
   }

   render() {

      var doDisplay = true;

      if (this.state.selection.planetName != "none") {
         var indices = indicesFromNames(this.state.systemsList, this.state.selection.systemName, this.state.selection.planetName);
         var sIndex = indices[0];
         var pIndex = indices[1];
         var buttonType = getButtonType(this.state.systemsList, sIndex, pIndex, this.state.playerInfo)
         var planetInfo = this.state.systemsList[sIndex].planetList[pIndex]
      }
      else {
         var doDisplay = false;
         buttonType = "noDisplay"
      }
      const buttonTypeToFunction = {startAttack: this.buttonAttack,
                                    greyedStartAttack: this.buttonCantAttack,
                                    joinAttack: this.buttonAttack,
                                    greyedJoinAttack: this.buttonCantAttack,
                                    joinDefense: this.buttonAttack,
                                    greyedJoinDefense: this.buttonCantAttack,
                                    battleOngoing: this.buttonCantAttack,
                                    error: this.buttonError,
                                    noDisplay: this.buttonNoDisplay}
      var buttonFunction = buttonTypeToFunction[buttonType]

      var interfaceElements = (doDisplay) ? [  <MapPreview inp = {new InpMapPreview({ mapName: planetInfo.mapInfo.mapName,
                                                                        mapSize: planetInfo.mapInfo.mapSize,
                                                                        mapImg: planetInfo.mapInfo.mapImg,
                                                                        maxPlayers: planetInfo.mapInfo.maxPlayers})} />,

                                                <ActionButton inp = {new InpActionButton({buttonType: buttonType,
                                                                                          buttonFunction: buttonFunction})} />,

                                                <BattleLobby inp = {new InpBattleLobby({  battleParticipants: planetInfo.currentBattle.battleParticipants,
                                                                                          status: planetInfo.currentBattle.status,
                                                                                          timeToBattle: planetInfo.currentBattle.timeToBattle,
                                                                                          maxPlayers: planetInfo.mapInfo.maxPlayers})} />]
                                             : <div></div>


      return (
         <div style = {{position: "relative"}}>

               <GalaxyMap  inp = {new InpGalaxyMap({  width: this.state.width, height: this.state.height,
                                                      mapWidth: this.state.mapWidth, mapHeight: this.state.mapHeight,
                                                      frameDim: this.state.frameDim,
                                                      simSettings: this.state.simSettings,
                                                      systemsList: this.state.systemsList,
                                                      selectedPlanet: this.state.selection.planetName,
                                                      funcPlanetOnClick: this.planetOnClick
                                                   })} />


               {interfaceElements}

         </div>

      );
   }

}




export default App;


function isPlanetAccessible() {
   return true
}

function getButtonType(systemsList, sIndex, pIndex, playerInfo) { //LOGIC FOR THE KIND OF ACTION HAPPENS HERE
   var buttonType = "noDisplay"
   const planetInfo = systemsList[sIndex].planetList[pIndex]

   switch (planetInfo.currentBattle.status) {
      case "idle":
         if (planetInfo.faction != playerInfo.faction) {
            if (isPlanetAccessible() && playerInfo.readyForBattle) {
               buttonType = "startAttack"
               console.log("startAttack")
            }
            else {
               buttonType = "greyedStartAttack"
               console.log("greyedStartAttack")
            }
         }
         else {
            buttonType = "noDisplay"
         }
         break;

      case "lobby":

         var factions = []
         var playerCount = 0
         for (var i = 0; i < planetInfo.currentBattle.battleParticipants.length; i++) {
            factions.push(planetInfo.currentBattle.battleParticipants[i].factionName)
               for (var j = 0; j < planetInfo.currentBattle.battleParticipants[i].length; j++) {
                  playerCount += 1
               }
         }

         if (factions.includes(playerInfo.faction) && playerCount < planetInfo.mapInfo.maxPlayers) {
            console.log("lobby - playerfaction present and lobby not full")
            if (planetInfo.faction != playerInfo.faction) {
               if (playerInfo.readyForBattle) {
                  buttonType = "joinAttack"
                  console.log("joinAttack")
               }
               else {
                  buttonType = "greyedJoinAttack"
                  console.log("greyedJoinAttack")
               }
            }
            else {
               if (playerInfo.readyForBattle) {
                  buttonType = "joinDefense"
                  console.log("joinDefense")
               }
               else {
                  buttonType = "greyedJoinDefense"
                  console.log("greyedJoinDefense")
               }
            }
         }
         break;

      case "battle":
         buttonType = "battleOngoing"
         console.log("battleOngoing")
         break;

      default:
         buttonType = "error"
         break;
   }
   return buttonType
}



function indicesFromNames(systemsList, systemName, planetName) {
   var sIndex = "empty";
   var pIndex = "empty";

   for (var i = 0; i < systemsList.length; i++) {
      if (systemsList[i].name == systemName) {
         sIndex = i;
      }
   }
   if (sIndex == "empty") {
      throw new Error("star with name " + systemName + " not found")
   }

   for (var i = 0; i < systemsList[sIndex].planetList.length; i++) {
      if (systemsList[sIndex].planetList[i].name == planetName) {
         pIndex = i;
      }
   }
   if (pIndex == "empty") {
      throw new Error("planet with name " + planetName + " not found within system " + systemName)
   }

   return [sIndex, pIndex]
}
