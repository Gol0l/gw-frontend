import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import {SolarSystem} from './SolarSystem.js';
import {InpSolarSystem} from '../inpclasses/InpSolarSystem.js';

import {DragBox} from './DragBox.js';
import {InpDragBox} from '../inpclasses/InpDragBox.js'

import {MapTile} from './MapTile.js';
import {InpMapTile} from '../inpclasses/InpMapTile.js';

import {MapLine} from './MapLine.js';
import {InpMapLine} from '../inpclasses/InpMapLine.js';

import {getVoronoi} from '../voronoi/getVoronoi.js';





class GalaxyMap extends React.Component {
   /*props: an object of the class InpGalaxyMap
   */
   constructor(props) {
      super(props);


      this.state = { simSettings: this.props.inp.simSettings,
                     leftShift: 0,
                     topShift: 0};


      this.initialVoronoi  = this.initialVoronoi.bind(this);
      this.initialSystemLines = this.initialSystemLines.bind(this);
      this.handleWheel = this.handleWheel.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
      this.getViewport = this.getViewport.bind(this);
      this.handleSystemSelect = this.handleSystemSelect.bind(this);

      this.selectedSystems = [];

      this.voronoiResult = this.initialVoronoi();
      this.systemLines = this.initialSystemLines();


   }

   initialSystemLines() {
      const systemsList = this.props.inp.systemsList;
      var lines = []
      for (var i = 0; i < systemsList.length; i++) {
         for (var j = 0; j < systemsList[i].neighbours.length; j++) {
            var neighbourIndex = systemIndexFromName(systemsList, systemsList[i].neighbours[j])
            var line = [[systemsList[i].left, systemsList[i].top], [systemsList[neighbourIndex].left, systemsList[neighbourIndex].top]]
            lines.push({line: line, origin: systemsList[i].name})
         }
      }
      return lines
   }

   initialVoronoi() {
      var bbox = {xl:0, xr: this.props.inp.mapWidth, yt:0, yb: this.props.inp.mapHeight};
      var positionList = []
      for (var i = 0; i < this.props.inp.systemsList.length; i++) {
         positionList.push({x: this.props.inp.systemsList[i].left, y: this.props.inp.systemsList[i].top})
      }

      return getVoronoi(positionList, bbox)

   }

   getViewport() {
      var viewport = {height: 0, width: 0, top: 0, left: 0}
      viewport.height = this.props.inp.height - this.props.inp.frameDim.topSize - this.props.inp.frameDim.bottomSize;
      viewport.width = this.props.inp.width - this.props.inp.frameDim.leftSize - this.props.inp.frameDim.rightSize;
      viewport.top = -this.state.topShift;
      viewport.left = -this.state.leftShift;
      return viewport
   }

   handleWheel(e) {
      const mapScale = this.state.simSettings.mapScale;
      var newScale = mapScale * (1.0 + (e.deltaY / -850));
      const position = ReactDOM.findDOMNode(this.dragBoxNode).getBoundingClientRect();
      var i = 0;
      while ((newScale * this.props.inp.mapWidth <= this.props.inp.width - (this.props.inp.frameDim.leftSize + this.props.inp.frameDim.rightSize)//limiting max zoom out
            ||
            newScale * this.props.inp.mapHeight <= this.props.inp.height - (this.props.inp.frameDim.topSize + this.props.inp.frameDim.bottomSize))
            &&
            i < 10) {
               i++
               newScale = (mapScale + newScale) / 2;
            }

      //setting zoom to zoom in on the mouse cursor by moving the DragBox according to the cursor position and mapWidth/Height increase


      const distanceLeft = position.left;
      const distanceTop = position.top;
      const horCursorPosRatio = (e.pageX - distanceLeft) / (mapScale * this.props.inp.mapWidth);
      const widthDiff = (newScale * this.props.inp.mapWidth) - (mapScale * this.props.inp.mapWidth);
      const verCursorPosRatio = (e.pageY - distanceTop) / (mapScale * this.props.inp.mapHeight);
      const heightDiff = (newScale * this.props.inp.mapHeight) - (mapScale * this.props.inp.mapHeight);
      const moveLeft = horCursorPosRatio * widthDiff;
      const moveTop = verCursorPosRatio * heightDiff;



      var newLeftShift = this.state.leftShift - moveLeft;
      var newTopShift = this.state.topShift - moveTop;
      const viewport = this.getViewport()
      const minTop = -(this.props.inp.mapHeight * mapScale - viewport.height);
      const minLeft = -(this.props.inp.mapWidth * mapScale - viewport.width);
      newTopShift = (newTopShift > 0) ? 0 : newTopShift;
      newTopShift = (newTopShift < minTop) ? minTop : newTopShift;
      newLeftShift = (newLeftShift > 0) ? 0 : newLeftShift;
      newLeftShift = (newLeftShift < minLeft) ? minLeft : newLeftShift;


      var tempSimSettings = this.state.simSettings;
      tempSimSettings.mapScale = newScale;

      this.setState({simSettings: tempSimSettings, leftShift: newLeftShift, topShift: newTopShift});

   }

   handleDrag(left, top) {
      this.setState({leftShift: left, topShift: top})
   }

   handleSystemSelect(name, currentlySelecting) {
      if (currentlySelecting) {
         this.selectedSystems.push(name)
      }
      else {
         var index = this.selectedSystems.indexOf(name);
         if (index > -1) {
             this.selectedSystems.splice(index, 1);
         }
      }
   }



   render() {
      const systemsList = this.props.inp.systemsList;
      const simSettings = this.state.simSettings;
      const mapScale = this.state.simSettings.mapScale;
      const width = this.props.inp.width;
      const height = this.props.inp.height;
      const mapWidth = this.props.inp.mapWidth;
      const mapHeight = this.props.inp.mapHeight;
      const frameDim = this.props.inp.frameDim;
      const playerFaction = this.props.inp.playerFaction;

      var displayList = [];
      var positionList = [];
      var tileColorList = [];
      var gateList = [];
      var playerGateList = [];
      const viewport = this.getViewport()
      for (var i = 0; i < systemsList.length; i++) {
         var isVisible = false;
         var widthPadding = 0.02 * viewport.width;
         var heightPadding = 0.02 * viewport.width;
         if (systemsList[i].left * mapScale > viewport.left - widthPadding && systemsList[i].left * mapScale < viewport.left + viewport.width + widthPadding
            && systemsList[i].top * mapScale > viewport.top - heightPadding && systemsList[i].top * mapScale < viewport.top + viewport.height + heightPadding) {
               isVisible = true;
            }
         var isSelected = (this.selectedSystems.indexOf(systemsList[i].name) != -1) ? true : false;
         displayList.push((isVisible || isSelected) ? <SolarSystem inp = {new InpSolarSystem({
                                                name: systemsList[i].name,
                                                displayName: systemsList[i].displayName,
                                                top: Math.floor(systemsList[i].top * mapScale),
                                                left: Math.floor(systemsList[i].left * mapScale),
                                                planetList: systemsList[i].planetList,
                                                centerMass: systemsList[i].centerMass,
                                                gravPar: systemsList[i].gravPar,
                                                neighbours: systemsList[i].neighbours,
                                                simSettings: { scale: simSettings.systemScale * mapScale, fps: simSettings.fps, simSpeed: simSettings.simSpeed,
                                                               basePlanetSize: simSettings.basePlanetSize, baseStarSize: simSettings.baseStarSize},
                                                selectedPlanet: this.props.inp.selectedPlanet,
                                                funcPlanetOnClick: this.props.inp.funcPlanetOnClick,
                                                funcSystemSelect: this.handleSystemSelect
                                                })}
                                       key = {i} /> : <div key = {i}></div>)


         var factionInfluence = getFactionInfluence(systemsList[i].planetList)
         if (factionInfluence.influence == 1) {
            gateList.push(systemsList[i].name);
            if (factionInfluence.faction == playerFaction) {
               playerGateList.push(systemsList[i].name);
            }
         }

         tileColorList.push(getTileColor(factionInfluence))


      }

      var polygonList = this.voronoiResult;
      var lineList = this.systemLines;

      var tileList = [];
      var systemConnections = []
      for (var i = 0; i < polygonList.length; i++) {
         tileList.push(<MapTile key = {i} inp = {new InpMapTile({points: polygonList[i], color: tileColorList[i]})} />)
      }


      for (var i = 0; i < lineList.length; i++) {
         if (playerGateList.includes(lineList[i].origin)) {

            systemConnections.push(<MapLine key = {i} inp = {new InpMapLine({points: lineList[i].line, type: "owned", identifier: i})} />)
         }
         else if (gateList.includes(lineList[i].origin)) {

            systemConnections.push(<MapLine key = {i} inp = {new InpMapLine({points: lineList[i].line, type: "active", identifier: i})} />)
         }
         else {

            systemConnections.push(<MapLine key = {i} inp = {new InpMapLine({points: lineList[i].line, type: "inactive", identifier: i})} />)

         }
      }


      return(
         <div id = "galaxywrapper"  style = {{position: "relative"}}>

            <div style = {{position: "relative", left: frameDim.leftSize, top: frameDim.topSize}}>
               <img src={require('../img/background2.jpg')} width = {width - (frameDim.rightSize + frameDim.leftSize)} height = {height - (frameDim.bottomSize + frameDim.topSize)}/>
               <DragBox inp = {new InpDragBox({ left: this.state.leftShift, top: this.state.topShift,
                                                minLeft: -(mapWidth * mapScale - (width - frameDim.leftSize - frameDim.rightSize)),
                                                minTop: -(mapHeight * mapScale - (height - frameDim.topSize - frameDim.bottomSize)),
                                                maxLeft: 0,
                                                maxTop: 0,
                                                returnShiftedPosition: this.handleDrag,
                                                content:
                                                   <div style = {{position: "absolute"}}>
                                                      <svg style = {{position: "absolute", width: mapWidth, height: mapHeight,
                                                                     transform: "scale(" + mapScale.toString() + "," + mapScale.toString() + ")", transformOrigin: "top left"}}>
                                                         {tileList}
                                                         {systemConnections}
                                                      </svg>
                                                      <div id="background" style = {{position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.2)", width: mapWidth * mapScale, height: mapHeight * mapScale}} onWheel = {this.handleWheel}>
                                                         {displayList}
                                                      </div>
                                                   </div>})

                              } ref = {node => this.dragBoxNode = node}/>
            </div>







         </div>

      )
   }
}

function systemIndexFromName(systemsList, systemName) {
   var sIndex = "empty";

   for (var i = 0; i < systemsList.length; i++) {
      if (systemsList[i].name == systemName) {
         sIndex = i;
      }
   }
   if (sIndex == "empty") {
      throw new Error("star with name " + systemName + " not found")
   }

   return sIndex
}


function getFactionInfluence(planetList) {
   var factions = ["aeon", "cybran", "uef", "seraphim"]
   var factionInfluence = [0, 0, 0, 0]
   for (var j = 0; j < planetList.length; j++) {
      switch (planetList[j].faction) {
         case (factions[0]):
            factionInfluence[0] += 1
            break;
         case (factions[1]):
            factionInfluence[1] += 1
            break;
         case (factions[2]):
            factionInfluence[2] += 1
            break;
         case (factions[3]):
            factionInfluence[3] += 1
            break;
      }
   }
   var tempMax = Math.max(...factionInfluence)
   if (factionInfluence.reduce((pv, cv) => pv += ((cv == tempMax) ? 1 : 0), 0) == 1) { //if maximum is unique

      var influence = tempMax / factionInfluence.reduce((pv, cv) => pv + cv, 0);

      var strongestFaction = factions[factionInfluence.indexOf(tempMax)];

   }

   else {

      var influence = 0;

      var strongestFaction = "none";
   }

   return ({faction: strongestFaction, influence: influence})

}

function getTileColor(factionInfluence) {
   var tileColor;
   switch (factionInfluence.faction) {
      case ("aeon"):
         tileColor = "rgba(0, " + Math.round(255 * factionInfluence.influence).toString() + ", 0, 0.25)"
         break;
      case ("cybran"):
         tileColor = "rgba(" + Math.round(255 * factionInfluence.influence).toString() + ", 0, 0, 0.25)"
         break;
      case ("uef"):
         tileColor = "rgba(0, 0, " + Math.round(255 * factionInfluence.influence).toString() + ", 0.25)"
         break;
      case ("seraphim"):
         tileColor = "rgba(" + Math.round(255 * factionInfluence.influence).toString() + ", " + Math.round(255 * factionInfluence.influence).toString() + ", 0, 0.25)"
         break;
      case ("none"):
         tileColor = "rgba(0, 0, 0, 0.25)"
      default:
         tileColor = "rgba(0, 0, 0, 0.25)"

   }

   return tileColor

}

export {GalaxyMap};
