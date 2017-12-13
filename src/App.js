import React, { Component } from 'react';
import {GalaxyMap} from './components/GalaxyMap.js';
import {InpGalaxyMap} from './inpclasses/InpGalaxyMap.js';
import {MapPreview} from './components/MapPreview.js';
import {InpMapPreview} from './inpclasses/InpMapPreview.js'
import {BattleLobby} from './components/BattleLobby.js';
import {InpBattleLobby} from './inpclasses/InpBattleLobby.js'
import {ActionButton} from './components/ActionButton.js';
import {InpActionButton} from './inpclasses/InpActionButton.js';
import {AudioController} from './components/AudioController.js';
import {InpLoginBox} from './inpclasses/InpLoginBox.js';
import {LoginBox} from './components/LoginBox.js';
import {InpCharacterCreation} from './inpclasses/InpCharacterCreation.js';
import {CharacterCreation} from './components/CharacterCreation.js';
import {EquipmentWidget} from './components/EquipmentWidget.js';
import {InpEquipmentWidget} from './inpclasses/InpEquipmentWidget.js';

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
         selection: {system_Id: "none", planet_Id: "none", planetRect: "none"},
         globalUpdate: false

      };
      switch (this.props.model.playerInfo.faction) {
         case "aeon":
            require("./style/gw-style-aeon.css")
            break;
         case "uef":
            require("./style/gw-style-uef.css")
            break;
         case "cybran":
            require("./style/gw-style-cybran.css")
            break;
         case "seraphim":
            require("./style/gw-style-seraphim.css")
            break;
         default:
            require("./style/gw-style-uef.css")
            break;
      }

      this.planetOnClick = this.planetOnClick.bind(this);
      this.resizeWindow = this.resizeWindow.bind(this);
      this.shopProcessTransactions = this.shopProcessTransactions.bind(this);
      this.buttonStartAttack = this.buttonStartAttack.bind(this);
      this.buttonJoinAttack = this.buttonJoinAttack.bind(this);
      this.buttonJoinDefense = this.buttonJoinDefense.bind(this);
      this.buttonLeaveLobby = this.buttonLeaveLobby.bind(this);
      this.buttonCantAttack = this.buttonCantAttack.bind(this);
      this.buttonError = this.buttonError.bind(this);
      this.buttonNoDisplay = this.buttonNoDisplay.bind(this);
      this.submitLogin = this.submitLogin.bind(this);
      this.submitCharacter = this.submitCharacter.bind(this);
      this.requestName = this.requestName.bind(this);
      this.forceUpdateFunction = this.forceUpdateFunction.bind(this);
      this.props.model.getForceAppUpdateFromApp(this.forceUpdateFunction);

      }


   componentDidMount() {
      window.addEventListener('resize', this.resizeWindow);
   }



   forceUpdateFunction() {
      console.log("forcing an update on:");
      console.log(this);
      this.setState({globalUpdate: true});
   }

   resizeWindow(newWidth, newHeight) {
      newWidth = window.innerWidth;
      newHeight = window.innerHeight;
      this.setState({width: newWidth, height: newHeight});
   }

   planetOnClick(system_Id, id, rect, selecting) {
      if (selecting == true) {
         this.setState({selection: {system_Id: system_Id, planet_Id: id, planetRect: rect}});
         var selectSFX = new Audio(require('./sounds/select1.ogg'));
         selectSFX.volume = 0.5;
         selectSFX.play();
         //select2SFX.play();
      }
      else if (selecting == false && this.state.selection.planet_Id == id) {
         this.setState({selection: {system_Id: "none", planet_Id: "none", planetRect: "none"}});
      }


   }

   shopProcessTransactions(transactions) {
      this.props.shopCallback(transactions);
   }

   buttonStartAttack() {
      this.props.buttonCallback(this.state.selection.planet_Id, "startAttack")
   }

   buttonJoinAttack() {
      this.props.buttonCallback(this.state.selection.planet_Id, "joinAttack")
   }

   buttonJoinDefense() {
      this.props.buttonCallback(this.state.selection.planet_Id, "joinDefense")
   }

   buttonLeaveLobby() {
      this.props.buttonCallback(this.state.selection.planet_Id, "leaveLobby")
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
   submitLogin(name, password) {
      alert('logging you in...', name, password)
   }
   submitCharacter(characterFaction, characterName) {
      alert('new char', characterFaction, characterName)
   }
   requestName(characterFaction) {
      return (characterFaction.toString() + "Name")
   }

   componentDidUpdate() {
      if (this.state.globalUpdate) {
         this.setState({globalUpdate: false});
      }
   }


   render() {

      var displayInterface = true;

      if (this.state.selection.planet_Id != "none") {
         var indices = indicesFromIds(this.state.systemsList, this.state.selection.system_Id, this.state.selection.planet_Id);
         var sIndex = indices[0];
         var pIndex = indices[1];
         var buttonType = getButtonType(this.state.systemsList, sIndex, pIndex, this.state.playerInfo)
         var planetInfo = this.state.systemsList[sIndex].planetList[pIndex]
      }
      else {
         var displayInterface = false;
         buttonType = "noDisplay"
      }
      const buttonTypeToFunction = {startAttack: this.buttonStartAttack,
                                    greyedStartAttack: this.buttonCantAttack,
                                    joinAttack: this.buttonJoinAttack,
                                    greyedJoinAttack: this.buttonCantAttack,
                                    joinDefense: this.buttonJoinDefense,
                                    greyedJoinDefense: this.buttonCantAttack,
                                    battleOngoing: this.buttonCantAttack,
                                    leaveLobby: this.buttonLeaveLobby,
                                    error: this.buttonError,
                                    noDisplay: this.buttonNoDisplay}

      var buttonFunction = buttonTypeToFunction[buttonType];


      var loginElement = (!this.state.playerInfo.isLoggedIn) ? <LoginBox inp={new InpLoginBox({submitFunction: this.submitLogin})} /> : <div></div>;
      console.log( "loggedin?", this.state.playerInfo.isLoggedIn);

      var characterElement = (this.state.playerInfo.isLoggedIn && !this.state.playerInfo.hasCharacter) ?
         <CharacterCreation inp={new InpCharacterCreation({ submitFunction: this.submitCharacter,
                                                            requestName: this.requestName,
                                                            suggestedName: this.state.playerInfo.suggestedDisplayName
                                                         })} /> : <div id="nocharacterCreation"></div>;

      console.log( "character?", (this.state.playerInfo.isLoggedIn && !this.state.playerInfo.hasCharacter));

      var mapElement = (this.state.playerInfo.isLoggedIn && this.state.playerInfo.hasCharacter) ? <GalaxyMap  inp = {new InpGalaxyMap({width: this.state.width, height: this.state.height,
                                                                                                                                       mapWidth: this.state.mapWidth, mapHeight: this.state.mapHeight,
                                                                                                                                       frameDim: this.state.frameDim,
                                                                                                                                       simSettings: this.state.simSettings,
                                                                                                                                       systemsList: this.state.systemsList,
                                                                                                                                       selectedPlanet: this.state.selection.planet_Id,
                                                                                                                                       playerFaction: this.state.playerInfo.faction,
                                                                                                                                       funcPlanetOnClick: this.planetOnClick,
                                                                                                                                       globalUpdate: this.state.globalUpdate
                                                                                                                                    })} />: <div></div>;



      var audioElement = (this.state.playerInfo.isLoggedIn && this.state.playerInfo.hasCharacter) ? <AudioController/>: <div></div>;

      var interfaceElements = (displayInterface) ? [  <MapPreview inp = {new InpMapPreview({ mapName: planetInfo.mapInfo.mapName,
                                                                                             mapSize: planetInfo.mapInfo.mapSize,
                                                                                             mapImg: planetInfo.mapInfo.mapImg,
                                                                                             maxPlayers: planetInfo.mapInfo.maxPlayers})} />,
                                                      <div id = "buttonWrap" style = {{position: "relative", left: this.state.width / 2}}>
                                                         <ActionButton inp = {new InpActionButton({buttonType: buttonType,
                                                                                                   buttonFunction: buttonFunction})} />
                                                      </div>,
                                                      <BattleLobby inp = {new InpBattleLobby({  battleParticipants: planetInfo.currentBattle.battleParticipants,
                                                                                                status: planetInfo.currentBattle.status,
                                                                                                waitingProgress: planetInfo.currentBattle.waitingProgress,
                                                                                                maxPlayers: planetInfo.mapInfo.maxPlayers})} />]
                                                   : <div></div>;


      var shopTestData = [{image: "tank.png",
                           name: "heavy tank",
                           itemId: "1",
                           price: 200},
                          {image: "tank.png",
                           name: "light tank",
                           itemId: "2",
                           price: 350},
                          {image: "tank.png",
                           name: "arty",
                           itemId: "3",
                           price: 500},
                          {image: "tank.png",
                           name: "heavy tank",
                           itemId: "4",
                           price: 200},
                          {image: "tank.png",
                           name: "light tank",
                           itemId: "5",
                           price: 350},
                          {image: "tank.png",
                           name: "heavy tank",
                           itemId: "6",
                           price: 200},
                          {image: "tank.png",
                           name: "light tank",
                           itemId: "7",
                           price: 350},
                        {image: "tank.png",
                         name: "light tank",
                         itemId: "5",
                         price: 350},
                        {image: "tank.png",
                         name: "heavy tank",
                         itemId: "6",
                         price: 200},
                        {image: "tank.png",
                         name: "light tank",
                         itemId: "7",
                         price: 350}];

      var equipmentWidgetElement = <EquipmentWidget inp = {new InpEquipmentWidget({ shopItems: shopTestData,
                                                                                    inventoryItems: shopTestData,
                                                                                    shopProcessTransactions: this.shopProcessTransactions,
                                                                                    userBalance: 2000})} />


      return (
         <div style = {{position: "relative"}}>

               {mapElement}

               {audioElement}
               {equipmentWidgetElement}
               {interfaceElements}
               {characterElement}
               {loginElement}



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
            if (isPlanetAccessible() && !playerInfo.isInBattle) {
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
         for (var i = 0; i < planetInfo.currentBattle.battleParticipantsUnique.length; i++) {
            factions.push(planetInfo.currentBattle.battleParticipantsUnique[i].factionName)
            if (planetInfo.currentBattle.battleParticipantsUnique[i].factionName == playerInfo.faction) {
               for (var j = 0; j < planetInfo.currentBattle.battleParticipantsUnique[i].players.length; j++) {
                  playerCount += 1;
               }
            }
         }
         var teamIndex = factions.indexOf(playerInfo.faction);
         var playerInLobby = false;

         if (teamIndex != -1) {
            playerInLobby = ((planetInfo.currentBattle.battleParticipantsUnique[teamIndex].players).includes(playerInfo.id)) ? true : false;
         }
         else {
            playerInLobby = false;
         }
         if (!playerInLobby) {
            if (factions.includes(playerInfo.faction)) {
               if (planetInfo.faction != playerInfo.faction) {
                  if (!playerInfo.isInBattle && playerCount <= planetInfo.mapInfo.maxPlayers / 2) {
                     buttonType = "joinAttack"
                  }
                  else {
                     buttonType = "greyedJoinAttack"
                  }
               }
               else {
                  if (!playerInfo.isInBattle && playerCount <= planetInfo.mapInfo.maxPlayers / 2) {
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

   return buttonType
}



function indicesFromIds(systemsList, system_Id, planet_Id) {
   var sIndex = "empty";
   var pIndex = "empty";

   for (var i = 0; i < systemsList.length; i++) {
      if (systemsList[i].id == system_Id) {
         sIndex = i;
      }
   }
   if (sIndex == "empty") {
      throw new Error("star with id " + system_Id + " not found")
   }

   for (var i = 0; i < systemsList[sIndex].planetList.length; i++) {
      if (systemsList[sIndex].planetList[i].id == planet_Id) {
         pIndex = i;
      }
   }
   if (pIndex == "empty") {
      throw new Error("planet with id " + planet_Id + " not found within system " + system_Id)
   }

   return [sIndex, pIndex]
}
