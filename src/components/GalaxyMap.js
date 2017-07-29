import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import {SolarSystem} from './SolarSystem.js';
import {InpSolarSystem} from '../inpclasses/InpSolarSystem.js';

import {DragBox} from './DragBox.js';
import {InpDragBox} from '../inpclasses/InpDragBox.js'

import {WindowFrame} from './WindowFrame.js';
import {InpWindowFrame} from '../inpclasses/InpWindowFrame.js'

import {MapTile} from './MapTile.js';
import {InpMapTile} from '../inpclasses/InpMapTile.js';

import {getVoronoi} from '../voronoi/getVoronoi.js';





class GalaxyMap extends React.Component {
   /*props: an object of the class InpGalaxyMap
   */
   constructor(props) {
      super(props);


      this.state = { simSettings: this.props.inp.simSettings};





      this.handleWheel = this.handleWheel.bind(this);



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


      var tempNodeDynamicStyle = this.dragBoxNode.state.dynamicStyle;
      tempNodeDynamicStyle.left = this.dragBoxNode.state.dynamicStyle.left - moveLeft;
      tempNodeDynamicStyle.top = this.dragBoxNode.state.dynamicStyle.top - moveTop;

      const minTop = -(this.props.inp.mapHeight * mapScale - (this.props.inp.height - this.props.inp.frameDim.topSize - this.props.inp.frameDim.bottomSize));
      const minLeft = -(this.props.inp.mapWidth * mapScale - (this.props.inp.width - this.props.inp.frameDim.leftSize - this.props.inp.frameDim.rightSize));
      tempNodeDynamicStyle.top = (tempNodeDynamicStyle.top > 0) ? 0 : tempNodeDynamicStyle.top;
      tempNodeDynamicStyle.top = (tempNodeDynamicStyle.top < minTop) ? minTop : tempNodeDynamicStyle.top;
      tempNodeDynamicStyle.left = (tempNodeDynamicStyle.left > 0) ? 0 : tempNodeDynamicStyle.left;
      tempNodeDynamicStyle.left = (tempNodeDynamicStyle.left < minLeft) ? minLeft : tempNodeDynamicStyle.left;

      this.dragBoxNode.setState({dynamicStyle: tempNodeDynamicStyle});

      var tempSimSettings = this.state.simSettings;
      tempSimSettings.mapScale = newScale;
      this.setState({simSettings: tempSimSettings});
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
      const startOffsetTop = this.state.startOffsetTop;
      const startOffsetLeft = this.state.startOffsetLeft;

      var displayList = [];
      var positionList = [];
      for (var i = 0; i < systemsList.length; i++) {
         displayList.push(<SolarSystem inp = {new InpSolarSystem({
                                                top: Math.floor(systemsList[i].top * mapScale),
                                                left: Math.floor(systemsList[i].left * mapScale),
                                                planetList: systemsList[i].planetList,
                                                centerMass: systemsList[i].centerMass,
                                                gravPar: systemsList[i].gravPar,
                                                simSettings: { scale: simSettings.systemScale * mapScale, fps: simSettings.fps, simSpeed: simSettings.simSpeed,
                                                               basePlanetSize: simSettings.basePlanetSize, baseStarSize: simSettings.baseStarSize}
                                                })}
                                       key = {i}/>)

         positionList.push({x: systemsList[i].left * mapScale, y: systemsList[i].top * mapScale})

      }

      const bbox = {xl:0, xr: mapWidth * mapScale, yt:0, yb: mapHeight * mapScale};
      const tesselation = getVoronoi(positionList, bbox);
      var tileList = [];
      for (var i = 0; i < tesselation.length; i++)
      {
         tileList.push(<MapTile key = {i} inp = {{points: tesselation[i], color: "rgba(0, 30, 50, 0.25)"}} />)
      }


      return(
         <div id = "galaxywrapper">

            <div style = {{position: "absolute", left: frameDim.leftSize, top: frameDim.topSize}}>
               {<img src={require('../img/background2.jpg')} width = {width - (frameDim.rightSize + frameDim.leftSize)} height = {height - (frameDim.bottomSize + frameDim.topSize)}/>
               }
               <DragBox inp = {new InpDragBox({ left: "auto", top: "auto", width: "auto", height: "auto",
                                                minLeft: -(mapWidth * mapScale - (width - frameDim.leftSize - frameDim.rightSize)),
                                                minTop: -(mapHeight * mapScale - (height - frameDim.topSize - frameDim.bottomSize)),
                                                maxLeft: 0,
                                                maxTop: 0,
                                                content:
                                                   <div>
                                                      <svg style = {{position: "absolute", width: bbox.xr, height: bbox.yb}}>
                                                         {tileList}
                                                      </svg>
                                                      <div id="background" style = {{position: "absolute", backgroundColor: "rgba(0, 0, 40, 0.3)", width: mapWidth * mapScale, height: mapHeight * mapScale}} onWheel = {this.handleWheel}>
                                                         {displayList}
                                                      </div>

                                                   </div>})

                              } ref = {node => this.dragBoxNode = node}/>
            </div>

            <WindowFrame  inp = {new InpWindowFrame({ left: 0, top: 0,
                                                      width: width, height: height,
                                                      leftSize: frameDim.leftSize, rightSize: frameDim.rightSize,
                                                      topSize: frameDim.topSize, bottomSize: frameDim.bottomSize,
                                                      color: "darkGray"})
                                 }/>




         </div>

      )
   }
}


export {GalaxyMap};
