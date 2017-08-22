import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Satellite} from './Satellite.js';
import {InpSatellite} from '../inpclasses/InpSatellite.js'
import {CenterMass} from './CenterMass.js'
import {InpCenterMass} from '../inpclasses/InpCenterMass.js'
import {StatusBar} from './StatusBar.js';
import {InpStatusBar} from '../inpclasses/InpStatusBar.js';


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

      const divStyle = {position: "absolute", transform: "translate(" + left.toString() + "px," + top.toString() + "px)"};
      const settings = {gravPar: this.props.inp.gravPar,
                        displayScale: scale * this.state.scaleFactor,
                        fps: this.props.inp.simSettings.fps,
                        simSpeed: this.props.inp.simSettings.simSpeed};

      const planetList = this.props.inp.planetList

      var battleCount = 0;
      var lobbyCount = 0;
      var displayList = [];
      for (var i = 0; i < planetList.length; i++) {
         if (planetList[i].currentBattle.status == "battle") {
            battleCount += 1;
         }
         if (planetList[i].currentBattle.status == "lobby") {
            lobbyCount += 1;
         }

         displayList.push(<Satellite key = {i} inp = {new InpSatellite({systemName: this.props.inp.name,
                                                                        radius: planetList[i].distance,
                                                                        size: planetList[i].size * basePlanetSize,
                                                                        start: "random",
                                                                        settings: settings,
                                                                        content: planetList[i].sprite,
                                                                        spin: planetList[i].spin,
                                                                        name: planetList[i].name,
                                                                        displayName: planetList[i].displayName,
                                                                        status: planetList[i].currentBattle.status,
                                                                        timeToBattle: planetList[i].currentBattle.timeToBattle,
                                                                        faction: planetList[i].faction,
                                                                        isSelected: (this.props.inp.selectedPlanet == planetList[i].name) ? true : false,
                                                                        funcPlanetOnClick: this.props.inp.funcPlanetOnClick

                                                                        })
                                                      } />)

      }
      var statusContent = [];
         if (lobbyCount > 0) {
            statusContent.push(  <div style = {{height: "1em", width: "1em"}}>
                                    <img style = {{left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/lobbySymbol.jpeg')}/>
                                 </div>)
            statusContent.push(  <div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>
                                    {lobbyCount}
                                 </div>)
         }
         if (battleCount > 0) {
            statusContent.push(  <div style = {{height: "1em", width: "1em"}}>
                                    <img style = {{left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/battleSymbol.gif')}/>
                                 </div>)
            statusContent.push(  <div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>
                                    {battleCount}
                                 </div>)

         }



      const leftShift = -centerMass.radius * Math.sqrt(scale) * baseStarSize
      const topShift = -centerMass.radius * Math.sqrt(scale) * baseStarSize
      const width = centerMass.radius * 2 * Math.sqrt(scale) * baseStarSize
      const height = centerMass.radius * 2 * Math.sqrt(scale) * baseStarSize

      return (
         <div id = "container" style = {divStyle}>

            {(scale < 8) ? <div></div> :
               <StatusBar inp = {new InpStatusBar({height: 16,
                                                   distance: height * 0.6 + 3,
                                                   contents: statusContent})
               } />
            }

            {(scale < 8) ? <div></div> :
               <StatusBar inp = {new InpStatusBar({height: 14,
                                                   distance: -height * 0.6 - 14,
                                                   contents: [<div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>{this.props.inp.displayName}</div>]})
               } />
            }

            {(this.state.scaleFactor > 0.01) ? displayList : null}


            <div  style = {{position: "absolute", left: leftShift, top: topShift}}
                  onClick = {this.handleClick}
                  ref = {(node) => this.centerMassNode = node}>
               <CenterMass inp = {new InpCenterMass({ width: width, height: height,
                                                      brightness: centerMass.brightness, color: centerMass.color, coronaColor: centerMass.coronaColor})} />
            </div>



         </div>
      )
   }
}

export {SolarSystem};
