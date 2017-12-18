import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesMapLine.js'

class MapLine extends React.Component {

   constructor(props) {
      super(props);
   }

   shouldComponentUpdate(nextProps) {
      if (nextProps.color != this.props.color) {
         return true
      }
      else {
         return false
      }
   }


   render() {
      var number = this.props.identifier;
      if (this.props.type == "inactive") {
         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {this.props.points[0][0]}
                                                                     y1 = {this.props.points[0][1]}
                                                                     x2 = {this.props.points[1][0]}
                                                                     y2 = {this.props.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     </linearGradient>



                     <line x1 = {this.props.points[0][0]}
                        y1 = {this.props.points[0][1]}
                        x2 = {this.props.points[1][0]}
                        y2 = {this.props.points[1][1]}
                        stroke = {"url(#line" + number.toString() + ")"}

                        strokeWidth = {0.6} />
                  </svg>
            )

      }

      if (this.props.type == "active") {

         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {this.props.points[0][0]}
                                                                     y1 = {this.props.points[0][1]}
                                                                     x2 = {this.props.points[1][0]}
                                                                     y2 = {this.props.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     </linearGradient>



                     <line x1 = {this.props.points[0][0]}
                        y1 = {this.props.points[0][1]}
                        x2 = {this.props.points[1][0]}
                        y2 = {this.props.points[1][1]}
                        stroke = {"url(#line" + number.toString() + ")"}

                        strokeWidth = {1} />
                  </svg>
            )
      }

      if (this.props.type == "owned") {
         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id = {"line" + number.toString()}   x1 = {this.props.points[0][0]}
                                                                     y1 = {this.props.points[0][1]}
                                                                     x2 = {this.props.points[1][0]}
                                                                     y2 = {this.props.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"1"}} />
                        <stop offset="66%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"1"}} />
                        <stop offset="95%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(255,255,255)", stopOpacity:"0"}} />
                     </linearGradient>

                     <filter id="glow">
                         <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                         <feMerge>
                             <feMergeNode in="coloredBlur"/>
                             <feMergeNode in="SourceGraphic"/>
                         </feMerge>
                     </filter>


                     <line x1 = {this.props.points[0][0]}
                        y1 = {this.props.points[0][1]}
                        x2 = {this.props.points[1][0]}
                        y2 = {this.props.points[1][1]}

                        stroke = {"url(#line" + number.toString() + ")"}
                        style = {{}}
                        strokeWidth = {1} />
                  </svg>
            )
      }
   }
}

MapLine.propTypes = propTypesTemplate;
export {MapLine};


/*
function prepareSystemLines(systemLines, mapScale) {

   var newLines = [];
   for (var i = 0; i < systemLines.length; i++) {
      var line = [];
      line.push([systemLines[i].line[0][0] * mapScale, systemLines[i].line[0][1] * mapScale])
      line.push([systemLines[i].line[1][0] * mapScale, systemLines[i].line[1][1] * mapScale])
      newLines.push({line: line, origin: systemLines[i].origin})
   }
   return newLines
}
*/
