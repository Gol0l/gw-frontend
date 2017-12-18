import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {StatusBar} from './StatusBar.js';
import {Selector} from './Selector.js';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesSatellite.js'

class Satellite extends React.Component {
   /*props: an object of the class InpSatellite
   */
   constructor(props) {
      super(props);

      const gravPar = this.props.settings.gravPar;
      const radius = this.props.radius;
      const start = this.props.start;
      this.state = {
         angle: (isNaN(start) ? Math.random() * 2 * Math.PI
                              : start % (2 * Math.PI)),
         angularSpeed: Math.sqrt(gravPar / Math.pow(radius, 3)),
         rotation: 0
      };

      this.updateAngle = this.updateAngle.bind(this);
      this.handleOnClick = this.handleOnClick.bind(this);
   }

   componentDidMount() {
      const fps = this.props.settings.fps;
      var intervalID = setInterval(this.updateAngle, Math.floor(1000 / fps));
      this.setState({intervalID: intervalID});
   }

   componentWillUnmount() {
      clearInterval(this.state.intervalID);
      this.props.funcPlanetOnClick(this.props.system_Id, this.props.id, ReactDOM.findDOMNode(this.planetNode).getBoundingClientRect(), false)

   }

   updateAngle() {
      const angle = this.state.angle;
      const angularSpeed = this.state.angularSpeed;
      const simSpeed = this.props.settings.simSpeed;
      const fps = this.props.settings.fps;
      var newAngle = (angle + angularSpeed * simSpeed / fps) % (2 * Math.PI);

      const spin = this.props.spin / fps * 360
      var newRotation = (this.state.rotation + spin) % 360
      this.setState({angle: newAngle,
                     rotation: newRotation});

   }

   handleOnClick() {

      if (this.props.isSelected) {
         this.props.funcPlanetOnClick(this.props.system_Id, this.props.id, ReactDOM.findDOMNode(this.planetNode).getBoundingClientRect(), false)
      }
      else {
         this.props.funcPlanetOnClick(this.props.system_Id, this.props.id, ReactDOM.findDOMNode(this.planetNode).getBoundingClientRect(), true)
      }


   }

   render() {

      const minScaleForDisplay = this.props.settings.planetScaleUiThreshold;
      const displayScale = this.props.settings.displayScale;
      const objectSize = this.props.size * Math.pow(displayScale, this.props.settings.planetScalingExponent);
      const radius = this.props.radius;

      var displaySprite =  <div  style = {{  position: "absolute",
                                             transform: "rotate(" + this.state.rotation.toString() + "deg)",
                                             width: Math.round(objectSize),
                                             height: Math.round(objectSize)
                                          }}>
                              <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/planetSprites/'+this.props.content.toString())}/>
                           </div>

      var displayShadow =  <div  style = {{  position: "absolute",
                                             transform: "translate("
                                             + (- 2/2).toString() + "px,"
                                             + (- 2/2).toString() + "px)"
                                             + " "
                                             + "rotate(" + (180*this.state.angle/Math.PI).toString() + "deg)",
                                             width: Math.round(objectSize) + 2,
                                             height: Math.round(objectSize) + 2
                                          }}>
                              <img style = {{pointerEvents: "none", position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/planetSprites/shadow.png')}/>
                           </div>

      var planetStyle = {  transform: "translate("
                        + (displayScale * radius * Math.cos(this.state.angle) - objectSize/2).toString() + "px,"
                        + (displayScale * radius * Math.sin(this.state.angle) - objectSize/2).toString() + "px)",
                           width: Math.round(objectSize),
                           height: Math.round(objectSize)}

      var factionImg;

      switch (this.props.faction) {

         case "aeon":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/aeon_transparent_bright.png')}/>;
            break;
         case "cybran":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/cybran_transparent_bright.png')}/>;
            break;
         case "uef":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/uef_transparent_bright.png')}/>;
            break;
         case "seraphim":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/seraphim_transparent_bright.png')}/>;
            break;
         default:
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/cybran_transparent_bright.png')}/>;

      }

      switch (this.props.status) {
         case "lobby":
            var statusContent =  <div style = {{height: "1em", width: "auto"}}>
                                    <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/lobbySymbol.jpeg')}/>
                                 </div>
            break;
         case "battle":
            var statusContent =  <div style = {{height: "1em", width: "auto"}}>
                                    <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/battleLogo.png')}/>
                                 </div>
            break;
         case "idle":
            var statusContent =  null
            break;
      }

      var displayStatus = [<StatusBar key = "status"  height = {16}
                                                      distance = {objectSize * 0.5 + 4}
                                                      contents = {[statusContent]} />,
                           <StatusBar key = "name" height = {12}
                                                   distance = {-objectSize * 0.5 - 13}
                                                   contents = {[<div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>{this.props.displayName}</div>]} />,
                           <StatusBar key = "factionSymbol" height = {28}
                                                            distance = {-objectSize * 0.5 - 42}
                                                            contents = {[<div style = {{height: "1em", width: "auto"}}>{factionImg}</div>]} />]


      var displaySelector = <Selector  width = {Math.round(objectSize * 2.4)}
                                       height = {Math.round(objectSize * 2.4)}
                                       isOpened = {this.props.isSelected} />


      return (
         <div style = {{position: "absolute"}}>


            <div style = {{position: "absolute",
                           transform: "translate("
                           + (displayScale * (radius * Math.cos(this.state.angle))).toString() + "px,"
                           + (displayScale * (radius * Math.sin(this.state.angle))).toString() + "px)"}}>

               {displaySelector}

               {(displayScale > minScaleForDisplay) ? displayStatus : <div></div>}
            </div>

            <div id = "planetWrapper" style = {planetStyle} ref = {(node) => this.planetNode = node} onClick = {this.handleOnClick}>
               {displaySprite}
               {displayShadow}
            </div>
         </div>

      )

   }
}

Satellite.propTypes = propTypesTemplate;
export {Satellite};
