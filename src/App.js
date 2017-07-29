import React, { Component } from 'react';
import './App.css';
import {SolarSystem} from './components/SolarSystem.js';
import {DragBox} from './components/DragBox.js';
import {GalaxyMap} from './components/GalaxyMap.js';
import {getVoronoi} from './voronoi/getVoronoi.js';
import {InpGalaxyMap} from './inpclasses/InpGalaxyMap.js';



class App extends Component {
   render() {

      var contentvar1 = {        top: 650,
                                 left: 300,
                                 centerMass: {radius: 1, color: "lightYellow", coronaColor: "lightYellow", brightness: 2},
                                 planetList: [
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites1.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites2.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites3.png')}/>,
                                       distance:2, size:1, spin:0.1}
                                 ],
                                 gravPar: 1}

      var contentvar2 = {        top: 300,
                                 left: 1050,
                                 centerMass: {radius: 1, color: "white", coronaColor: "lightYellow", brightness: 4},
                                 planetList: [
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites1.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites2.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites3.png')}/>,
                                       distance:2, size:1, spin:0.1}
                                 ],
                                 gravPar: 1}

      var contentvar3 = {        top: 700,
                                 left: 900,
                                 centerMass: {radius: 1.2, color: "white", coronaColor: "lightblue", brightness: 6},
                                 planetList: [
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites1.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites2.png')}/>,
                                       distance:2, size:1, spin:0.1},
                                       {content: <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('./img/planetSprites/planetSprites3.png')}/>,
                                       distance:2, size:1, spin:0.1}
                                 ],
                                 gravPar: 1}



      return (
      <div className="App">


         <div id = "positioner" style = {{position: "absolute", top: 50, left: 50}}>

            <GalaxyMap  inp = {new InpGalaxyMap({  width: 1240, height: 720,
                                                   mapWidth: 2000, mapHeight: 2000,
                                                   frameDim: {leftSize: 40, topSize: 40, rightSize: 350, bottomSize: 130},
                                                   simSettings: { mapScale: 1,
                                                                  systemScale: 12,
                                                                  baseStarSize: 1.2, basePlanetSize: 0.9,
                                                                  simSpeed: 1,
                                                                  fps: 50},
                                                   systemsList: [
                                                      contentvar1,
                                                      contentvar2,
                                                      contentvar3]
                                                })} />
         </div>


      </div>

      );
   }
}




export default App;
