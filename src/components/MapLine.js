import React, { Component } from 'react';

function MapLine (props) {

   console.log("type", props.inp.type)
   var number = props.inp.identifier;
   if (props.inp.type == "inactive") {
      return(  <svg>
                  <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {props.inp.points[0][0]}
                                                                  y1 = {props.inp.points[0][1]}
                                                                  x2 = {props.inp.points[1][0]}
                                                                  y2 = {props.inp.points[1][1]}>
                     <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                     <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                     <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                  </linearGradient>

                  <line x1 = {props.inp.points[0][0]}
                     y1 = {props.inp.points[0][1]}
                     x2 = {props.inp.points[1][0]}
                     y2 = {props.inp.points[1][1]}
                     stroke = {"url(#line" + number.toString() + ")"}
                     strokeWidth = "1px" />
               </svg>
         )

   }

   if (props.inp.type == "active") {
      console.log("activvvee")
      return(  <svg>
                  <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {props.inp.points[0][0]}
                                                                  y1 = {props.inp.points[0][1]}
                                                                  x2 = {props.inp.points[1][0]}
                                                                  y2 = {props.inp.points[1][1]}>
                     <stop offset="0%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="5%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="33%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                     <stop offset="66%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0.7"}} />
                     <stop offset="95%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                     <stop offset="100%" style={{stopColor:"rgb(100,100,100)", stopOpacity:"0"}} />
                  </linearGradient>

                  <line x1 = {props.inp.points[0][0]}
                     y1 = {props.inp.points[0][1]}
                     x2 = {props.inp.points[1][0]}
                     y2 = {props.inp.points[1][1]}
                     stroke = {"url(#line" + number.toString() + ")"}
                     strokeWidth = "3px" />
               </svg>
         )
   }

   if (props.inp.type == "owned") {
      return(  <svg>
                  <linearGradient gradientUnits = "userSpaceOnUse" id= {"line" + number.toString()}   x1 = {props.inp.points[0][0]}
                                                                  y1 = {props.inp.points[0][1]}
                                                                  x2 = {props.inp.points[1][0]}
                                                                  y2 = {props.inp.points[1][1]}>
                     <stop offset="0%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                     <stop offset="5%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                     <stop offset="33%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                     <stop offset="66%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                     <stop offset="95%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                     <stop offset="100%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                  </linearGradient>

                  <line x1 = {props.inp.points[0][0]}
                     y1 = {props.inp.points[0][1]}
                     x2 = {props.inp.points[1][0]}
                     y2 = {props.inp.points[1][1]}
                     stroke = {"url(#line" + number.toString() + ")"}
                     strokeWidth = "3px" />
               </svg>
         )
   }
}

const svgStyle =  <defs>
                     <linearGradient id="fadeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="5%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="33%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                        <stop offset="66%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0.7"}} />
                        <stop offset="95%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                        <stop offset="100%" style={{stopColor:"rgb(220,220,220)", stopOpacity:"0"}} />
                     </linearGradient>
                  </defs>
export {MapLine, svgStyle};
