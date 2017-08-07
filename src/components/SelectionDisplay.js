import React, { Component } from 'react';
import {InfoBar} from './InfoBar.js';
import {InpInfoBar} from '../inpclasses/InpInfoBar.js'



class SelectionDisplay extends React.Component {
   /*props: an object of the class InpSelectionDisplay
   */
   constructor(props) {
      super(props);

   }

   render() {
      var doDisplay = true;
      const systemsList = this.props.inp.systemsList;

      if (this.props.inp.selection.planetName != "none") {
         var indices = indicesFromNames(systemsList, this.props.inp.selection.systemName, this.props.inp.selection.planetName);
         var sIndex = indices[0];
         var pIndex = indices[1];
         var buttonType = getButtonType(systemsList, sIndex, pIndex, this.props.inp.playerInfo)
      }
      else {
         var doDisplay = false;
         buttonType = "noDisplay"
      }




      var displayContent = (doDisplay) ? <InfoBar inp = {new InpInfoBar( {
                                       width: this.props.inp.width,
                                       height: this.props.inp.height,
                                       planetFaction: systemsList[sIndex].planetList[pIndex].faction,
                                       planetName: systemsList[sIndex].planetList[pIndex].name,
                                       mapInfo: systemsList[sIndex].planetList[pIndex].mapInfo,
                                       battleInfo: {  battleParticipants: systemsList[sIndex].planetList[pIndex].battleParticipants,
                                                      timeToBattle: systemsList[sIndex].planetList[pIndex].timeToBattle,
                                                      status: systemsList[sIndex].planetList[pIndex].status},
                                       buttonType: buttonType,
                                       buttonFunction: this.props.inp.buttonTypeToFunction[buttonType] })} />
                        : <div></div>


      return (<div>
            {displayContent}
         </div>
      )
   }
}

export {SelectionDisplay};

function isPlanetAccessible() {
   return true
}

function getButtonType(systemsList, sIndex, pIndex, playerInfo) { //LOGIC FOR THE KIND OF ACTION HAPPENS HERE
   var buttonType = "noDisplay"
   const planetInfo = systemsList[sIndex].planetList[pIndex]
   switch (planetInfo.status) {
      case "idle":
         if (planetInfo.faction != playerInfo.faction) {
            if (isPlanetAccessible() && playerInfo.readyForbattle) {
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
         if (planetInfo.faction != playerInfo.faction) {
            if (playerInfo.readyForbattle) {
               buttonType = "joinAttack"
               console.log("joinAttack")
            }
            else {
               buttonType = "greyedJoinAttack"
               console.log("greyedJoinAttack")
            }
         }
         else {
            if (playerInfo.readyForbattle) {
               buttonType = "joinDefense"
               console.log("joinDefense")
            }
            else {
               buttonType = "greyedJoinDefense"
               console.log("greyedJoinDefense")
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
   var sIndex = "empty"
   var pIndex = "empty"

   for (var i = 0; i < systemsList.length; i++) {
      if (systemsList[i].name == systemName) {
         sIndex = i
      }
   }
   if (sIndex == "empty") {
      throw new Error("star with name " + systemName + " not found")
   }

   for (var i = 0; i < systemsList[sIndex].planetList.length; i++) {
      if (systemsList[sIndex].planetList[i].name == planetName) {
         pIndex = i
      }
   }
   if (pIndex == "empty") {
      throw new Error("planet with name " + planetName + " not found within system " + systemName)
   }

   return [sIndex, pIndex]
}
