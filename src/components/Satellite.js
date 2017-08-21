import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {StatusBar} from './StatusBar.js';
import {InpStatusBar} from '../inpclasses/InpStatusBar.js';
import {Selector} from './Selector.js';
import {InpSelector} from '../inpclasses/InpSelector.js';


class Satellite extends React.Component {
   /*props: an object of the class InpSatellite
   */
   constructor(props) {
      super(props);

      const gravPar = this.props.inp.settings.gravPar;
      const radius = this.props.inp.radius;
      const start = this.props.inp.start;
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
      const fps = this.props.inp.settings.fps;
      var intervalID = setInterval(this.updateAngle, Math.floor(1000 / fps));
      this.setState({intervalID: intervalID});
   }

   componentWillUnmount() {
      clearInterval(this.state.intervalID);
      this.props.inp.funcPlanetOnClick("none", "none", "none")

   }

   updateAngle() {
      const angle = this.state.angle;
      const angularSpeed = this.state.angularSpeed;
      const simSpeed = this.props.inp.settings.simSpeed;
      const fps = this.props.inp.settings.fps;
      var newAngle = (angle + angularSpeed * simSpeed / fps) % (2 * Math.PI);

      const spin = this.props.inp.spin / fps * 360
      var newRotation = (this.state.rotation + spin) % 360
      this.setState({angle: newAngle,
                     rotation: newRotation});

   }

   handleOnClick() {

      if (this.props.inp.isSelected) {
         this.props.inp.funcPlanetOnClick("none", "none", "none")
      }
      else {
         this.props.inp.funcPlanetOnClick(this.props.inp.systemName, this.props.inp.name, ReactDOM.findDOMNode(this.planetNode).getBoundingClientRect())
      }


   }

   render() {
      const minScaleForDisplay = 15;
      const objectSize = this.props.inp.size;
      const displayScale = this.props.inp.settings.displayScale;
      const radius = this.props.inp.radius;

      var displaySprite =  <div  style = {{  position: "absolute",
                                             transform: "rotate(" + this.state.rotation.toString() + "deg)",
                                             width: Math.round(objectSize * displayScale),
                                             height: Math.round(objectSize * displayScale)
                                          }}>
                              <img style = {{position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/planetSprites/'+this.props.inp.content.toString())}/>
                           </div>

      var displayShadow =  <div  style = {{  position: "absolute",
                                             transform: "translate("
                                             + (- 2/2).toString() + "px,"
                                             + (- 2/2).toString() + "px)"
                                             + " "
                                             + "rotate(" + (180*this.state.angle/Math.PI).toString() + "deg)",
                                             width: Math.round((objectSize) * displayScale) + 2,
                                             height: Math.round((objectSize) * displayScale) + 2
                                          }}>
                              <img style = {{pointerEvents: "none", position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%"}} src = {require('../img/planetSprites/shadow.png')}/>
                           </div>

      var planetStyle = {  transform: "translate("
                        + (displayScale * (radius * Math.cos(this.state.angle) - objectSize/2)).toString() + "px,"
                        + (displayScale * (radius * Math.sin(this.state.angle) - objectSize/2)).toString() + "px)",
                           width: Math.round(objectSize * displayScale),
                           height: Math.round(objectSize * displayScale)}

      var factionImg;

      switch (this.props.inp.faction) {

         case "aeon":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/aeon.jpeg')}/>;
            break;
         case "cybran":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/cybran.jpeg')}/>;
            break;
         case "uef":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/uef.jpeg')}/>;
            break;
         case "seraphim":
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/seraphim.jpeg')}/>;
            break;
         default:
            factionImg = <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/factionLogos/cybran.jpeg')}/>;

      }

      switch (this.props.inp.status) {
         case "lobby":
            var statusContent =  <div style = {{height: "1em", width: "auto"}}>
                                    <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/lobbySymbol.jpeg')}/>
                                 </div>
            break;
         case "battle":
            var statusContent =  <div style = {{height: "1em", width: "auto"}}>
                                    <img style = {{left: "0px", top: "0px", width: "auto", height: "100%"}} src = {require('../img/battleSymbol.gif')}/>
                                 </div>
            break;
         case "idle":
            var statusContent =  null
            break;
      }

      var displayStatus = [<StatusBar key = "status" inp = {new InpStatusBar({height: 16,
                                          distance: objectSize * displayScale * 0.5 + 4,
                                          contents: [statusContent]}) }/>,
                           <StatusBar key = "name" inp = {new InpStatusBar({height: 12,
                                          distance: -objectSize * displayScale * 0.5 - 13,
                                          contents: [<div style = {{fontSize: "1em", lineHeight: "1em", color: "white"}}>{this.props.inp.displayName}</div>]})
                           } />,
                           <StatusBar key = "factionSymbol" inp = {new InpStatusBar({height: 16,
                                          distance: -objectSize * displayScale * 0.5 - 30,
                                          contents: [<div style = {{height: "1em", width: "auto"}}>{factionImg}</div>]})
                           } />]


      var displaySelector = <Selector inp = {new InpSelector({ width: Math.round(objectSize * displayScale * 2.4), height: Math.round(objectSize * displayScale * 2.4),
                                                               isOpened: this.props.inp.isSelected})} />


      return (
         <div>


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
export {Satellite};
