import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Satellite} from './Satellite.js';
import {CenterMass} from './CenterMass.js'
import {StatusBar} from './StatusBar.js';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesSolarSystem.js'

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
         lastProps: this.props
      };

      this.handleClick = this.handleClick.bind(this);
      this.animExpand = this.animExpand.bind(this);
      this.deepEqual = require('deep-equal');
   }

   handleClick(e) {

      const fps = this.props.simSettings.fps;
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

         this.props.funcSystemSelect(this.props.id, true)
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
         if (!this.state.isExpanded) {
            this.props.funcSystemSelect(this.props.id, false)
         }
      }

      var increment = (goal - current) / animSteps;
      const newScaleFactor = this.state.scaleFactor + increment;
      const newAnimProgress = this.state.animProgress + 1;
      this.setState({scaleFactor: newScaleFactor,
                     animProgress: newAnimProgress});
   }

   shouldComponentUpdate(nextProps, nextState) {


      console.log(this.props.globalUpdate);

      if (this.props.globalUpdate) {
         return (true);
      }
      else {
         return (!this.deepEqual(nextProps, this.props) || !this.deepEqual(nextState, this.state));
      }

   }

   componentWillUnmount() {

   }

   render() {

      console.log("rendering SolarSystem")
      const top = this.props.top;
      const left = this.props.left;
      const basePlanetSize = this.props.simSettings.basePlanetSize;
      const baseStarSize = this.props.simSettings.baseStarSize;
      const scale = this.props.simSettings.scale;
      const centerMass = this.props.centerMass;

      const planetRadiusScale = this.props.simSettings.planetRadiusScale;

      const divStyle = {position: "absolute", transform: "translate(" + left.toString() + "px," + top.toString() + "px)"};
      const planetSettings = {gravPar: this.props.gravPar,
                              displayScale: scale * this.state.scaleFactor,
                              fps: this.props.simSettings.fps,
                              simSpeed: this.props.simSettings.simSpeed,
                              planetScalingExponent: this.props.simSettings.planetScalingExponent,
                              planetScaleUiThreshold: this.props.simSettings.planetScaleUiThreshold};
      console.log(this.props.simSettings)
      const planetList = this.props.planetList

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


         displayList.push(<Satellite key = {i}  system_Id = {this.props.id}
                                                radius = {planetList[i].distance * planetRadiusScale}
                                                size = {planetList[i].size * basePlanetSize}
                                                start = "random"
                                                settings = {planetSettings}
                                                content = {planetList[i].sprite}
                                                spin = {planetList[i].spin}
                                                id ={ planetList[i].id}
                                                displayName = {planetList[i].displayName}
                                                status = {planetList[i].currentBattle.status}
                                                faction = {planetList[i].faction}
                                                isSelected = {(this.props.selectedPlanet == planetList[i].id) ? true : false}
                                                funcPlanetOnClick = {this.props.funcPlanetOnClick} />)

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


      const scalingExponent = this.props.simSettings.centerMassScalingExponent;
      const leftShift = -centerMass.radius * Math.pow(scale, scalingExponent) * baseStarSize
      const topShift = -centerMass.radius * Math.pow(scale, scalingExponent) * baseStarSize
      const width = centerMass.radius * 2 * Math.pow(scale, scalingExponent) * baseStarSize
      const height = centerMass.radius * 2 * Math.pow(scale, scalingExponent) * baseStarSize

      const uiThreshold = this.props.simSettings.systemScaleUiThreshold;
      return (
         <div id = "container" style = {divStyle}>

            {(scale < uiThreshold) ? <div></div> :
               <StatusBar  height = {16}
                           distance = {height * 0.6 + 3}
                           contents = {statusContent} />
            }

            {(scale < uiThreshold) ? <div></div> :
               <StatusBar  height = {14}
                           distance = {-height * 0.6 - 14}
                           contents = {[<div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>{this.props.displayName}</div>]} />
            }

            {(this.state.scaleFactor > 0.01) ? displayList : null}


            <div  style = {{position: "absolute", left: leftShift, top: topShift}}
                  onClick = {this.handleClick}
                  ref = {(node) => this.centerMassNode = node}>
               <CenterMass width = {width}
                           height = {height}
                           brightness = {centerMass.brightness}
                           color = {centerMass.color}
                           coronaColor = {centerMass.coronaColor} />
            </div>

         </div>
      )
   }
}

SolarSystem.propTypes = propTypesTemplate;
export {SolarSystem};
