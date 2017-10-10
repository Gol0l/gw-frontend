import React, { Component } from 'react';

class MapLine extends React.Component {

   constructor(props) {
      super(props);
   }

   shouldComponentUpdate(nextProps) {
      if (nextProps.inp.color != this.props.inp.color) {
         return true
      }
      else {
         return false
      }
   }


   render() {
      var number = this.props.inp.identifier;

      if (this.props.inp.type == "inactive") {
         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {this.props.inp.points[0][0]}
                                                                     y1 = {this.props.inp.points[0][1]}
                                                                     x2 = {this.props.inp.points[1][0]}
                                                                     y2 = {this.props.inp.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     </linearGradient>

                     <line x1 = {this.props.inp.points[0][0]}
                        y1 = {this.props.inp.points[0][1]}
                        x2 = {this.props.inp.points[1][0]}
                        y2 = {this.props.inp.points[1][1]}
                        stroke = {"url(#line" + number.toString() + ")"}
                        strokeWidth = "1px" />
                  </svg>
            )

      }

      if (this.props.inp.type == "active") {

         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {this.props.inp.points[0][0]}
                                                                     y1 = {this.props.inp.points[0][1]}
                                                                     x2 = {this.props.inp.points[1][0]}
                                                                     y2 = {this.props.inp.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     </linearGradient>

                     <line x1 = {this.props.inp.points[0][0]}
                        y1 = {this.props.inp.points[0][1]}
                        x2 = {this.props.inp.points[1][0]}
                        y2 = {this.props.inp.points[1][1]}
                        stroke = {"url(#line" + number.toString() + ")"}
                        strokeWidth = "2px" />
                  </svg>
            )
      }

      if (this.props.inp.type == "owned") {
         return(  <svg>
                     <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {this.props.inp.points[0][0]}
                                                                     y1 = {this.props.inp.points[0][1]}
                                                                     x2 = {this.props.inp.points[1][0]}
                                                                     y2 = {this.props.inp.points[1][1]}>
                        <stop offset="0%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                     </linearGradient>

                     <line x1 = {this.props.inp.points[0][0]}
                        y1 = {this.props.inp.points[0][1]}
                        x2 = {this.props.inp.points[1][0]}
                        y2 = {this.props.inp.points[1][1]}
                        stroke = {"url(#line" + number.toString() + ")"}
                        strokeWidth = "2px" />
                  </svg>
            )
      }
   }
}

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
