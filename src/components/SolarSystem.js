import React, { Component } from 'react';
import {Satellite} from './Satellite.js';
import {InpSatellite} from '../inpclasses/InpSatellite.js'
import {CenterMass} from './CenterMass.js'
import {InpCenterMass} from '../inpclasses/InpCenterMass.js'

class SolarSystem extends React.Component {
   /*props: an object of the class InpSolarSystem
   */
   constructor(props) {
      super(props);

      this.state = {
         isExpanded: false,
         animDuration: 1, // in seconds
         animProgress: 0,
         scaleFactor: 0,
      };

      this.handleClick = this.handleClick.bind(this);
      this.animExpand = this.animExpand.bind(this);
   }

   handleClick(e) {

      const fps = this.props.inp.simSettings.fps;
      if (this.state.isExpanded === false) {
         const animSteps = Math.round(this.state.animDuration * fps);
         var current = this.state.isExpanded;
         var goal = 1;
         var current = this.state.scaleFactor;
         clearInterval(this.state.intervalID);
         var intervalID = setInterval(() => this.animExpand(animSteps, goal, current), Math.floor(1000 / fps));
         this.setState({isExpanded: true,
                        animProgress: 0,
                        intervalID: intervalID});
      }
      else {
         const animSteps = Math.round(this.state.animDuration * fps);
         var current = this.state.isExpanded;
         var goal = 0;
         var current = this.state.scaleFactor;
         clearInterval(this.state.intervalID);
         var intervalID = setInterval(() => this.animExpand(animSteps, goal, current), Math.floor(1000 / fps));
         this.setState({isExpanded: false,
                        animProgress: 0,
                        intervalID: intervalID});

      }



   }

   animExpand(animSteps, goal, current) {
      if (this.state.animProgress === animSteps) {
         clearInterval(this.state.intervalID);
         this.setState({scaleFactor: goal,
                        animProgress: 0});

      }

      var increment = (goal - current) / animSteps;
      const newScaleFactor = this.state.scaleFactor + increment;
      const newAnimProgress = this.state.animProgress + 1;
      this.setState({scaleFactor: newScaleFactor,
                     animProgress: newAnimProgress});
   }


   render() {

      const top = this.props.inp.top;
      const left = this.props.inp.left;
      const basePlanetSize = this.props.inp.simSettings.basePlanetSize;
      const baseStarSize = this.props.inp.simSettings.baseStarSize;
      const scale = this.props.inp.simSettings.scale
      const centerMass = this.props.inp.centerMass;
      const divStyle = {position: "absolute", top: top, left: left};
      const settings = {gravPar: this.props.inp.gravPar,
                        displayScale: scale * this.state.scaleFactor,
                        fps: this.props.inp.simSettings.fps,
                        simSpeed: this.props.inp.simSettings.simSpeed};
                        
      const planetList = this.props.inp.planetList


      var displayList = [];
      for (var i = 0; i < planetList.length; i++) {
         displayList.push(<Satellite key = {i} inp = {new InpSatellite({radius: planetList[i].distance,
                                                                        size: planetList[i].size * basePlanetSize,
                                                                        start: "random",
                                                                        settings: settings,
                                                                        content: planetList[i].content,
                                                                        spin: planetList[i].spin})
                                                      } />)

      }



      return (
         <div id = "container" style = {divStyle}>

            {(this.state.scaleFactor > 0.01) ? displayList : null}
            <div  style = {{position: "absolute",  left: -centerMass.radius/2 * scale * baseStarSize,
                                                   top: -centerMass.radius/2 * scale * baseStarSize}}
                  onClick = {this.handleClick}>
               <CenterMass inp = {{ width: centerMass.radius * scale * baseStarSize, height: centerMass.radius * scale * baseStarSize,
                                    brightness: centerMass.brightness, color: centerMass.color, coronaColor: centerMass.coronaColor}}/>
            </div>




         </div>
      )
   }
}

export {SolarSystem};
