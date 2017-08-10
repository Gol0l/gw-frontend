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
      this.resizeWindow = this.resizeWindow.bind(this);
      this.buttonAttack = this.buttonAttack.bind(this);
      this.buttonCantAttack = this.buttonCantAttack.bind(this);
      this.buttonError = this.buttonError.bind(this);
      this.buttonNoDisplay = this.buttonNoDisplay.bind(this);
      this.buttonLeaveLobby = this.buttonLeaveLobby.bind(this);

   }

   componentDidMount() {
      window.addEventListener('resize', this.resizeWindow);
   }

   resizeWindow(newWidth, newHeight) {
      newWidth = window.innerWidth;
      newHeight = window.innerHeight;
      this.setState({width: newWidth, height: newHeight});
   }

   planetOnClick(systemName, name, rect) {
      this.setState({selection: {systemName: systemName, planetName: name, planetRect: rect}});
   }

   buttonAttack() {
      alert('attacking/joining the battle for this planet')
   }
   buttonCantAttack() {
      alert('cant attack/join the battle for this planet!')
   }
   buttonError() {
      alert('error: planet status not proper?')
   }
   buttonNoDisplay() {
      alert('how did you click something that isnt supposed to be displayed')
   }
   buttonLeaveLobby() {
      alert('leaving the Lobby')
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
                                    leaveLobby: this.buttonLeaveLobby,
                                    error: this.buttonError,
                                    noDisplay: this.buttonNoDisplay}

      var buttonFunction = buttonTypeToFunction[buttonType]
      console.log("now", buttonType, buttonFunction)

      var interfaceElements = (doDisplay) ? [  <MapPreview inp = {new InpMapPreview({  mapName: planetInfo.mapInfo.mapName,
                                                                                       mapSize: planetInfo.mapInfo.mapSize,
                                                                                       mapImg: planetInfo.mapInfo.mapImg,
                                                                                       maxPlayers: planetInfo.mapInfo.maxPlayers})} />,
                                                <div id = "buttonWrap" style = {{position: "relative", left: this.state.width / 2}}>
                                                   <ActionButton inp = {new InpActionButton({buttonType: buttonType,
                                                                                             buttonFunction: buttonFunction})} />
                                                </div>,
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
            }
            else {
               buttonType = "greyedStartAttack"
            }
         }
         else {
            buttonType = "noDisplay"
         }
         break;

      case "lobby":

         var factions = [];
         var playerCount = 0;
         for (var i = 0; i < planetInfo.currentBattle.battleParticipants.length; i++) {
            factions.push(planetInfo.currentBattle.battleParticipants[i].factionName)
            if (planetInfo.currentBattle.battleParticipants[i].factionName == playerInfo.faction) {
               for (var j = 0; j < planetInfo.currentBattle.battleParticipants[i].players.length; j++) {
                  playerCount += 1;
               }
            }
         }
         var teamIndex = factions.indexOf(playerInfo.faction);
         var playerInLobby = false;

         if (teamIndex != -1) {
            playerInLobby = ((planetInfo.currentBattle.battleParticipants[teamIndex].players).includes(playerInfo.name)) ? true : false;
         }
         else {
            playerInLobby = false;
         }
         if (!playerInLobby) {
            if (factions.includes(playerInfo.faction)) {
               if (planetInfo.faction != playerInfo.faction) {
                  if (playerInfo.readyForBattle && playerCount < planetInfo.mapInfo.maxPlayers / 2) {
                     buttonType = "joinAttack"
                  }
                  else {
                     buttonType = "greyedJoinAttack"
                  }
               }
               else {
                  if (playerInfo.readyForBattle && playerCount < planetInfo.mapInfo.maxPlayers / 2) {
                     buttonType = "joinDefense"
                  }
                  else {
                     buttonType = "greyedJoinDefense"
                  }
               }
            }
            else {
               buttonType = "noDisplay";
            }
         }
         else {
            buttonType = "leaveLobby";
         }
         break;

      case "battle":
         buttonType = "battleOngoing";
         break;

      default:
         buttonType = "error";
         break;
   }
   console.log("buttonType", buttonType)
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
