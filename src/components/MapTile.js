import React, { Component } from 'react';

class MapTile extends React.Component {

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
      var stringPolygon = ""

      for (var j = 0; j < this.props.inp.points.length; j++) {

         stringPolygon += this.props.inp.points[j][0].toString() + "," + this.props.inp.points[j][1].toString() + " "
      }
      const pathId = require('uuid/v4')();


      return (
            <svg>
               <clipPath id = {pathId}>
                  <polygon points = {stringPolygon} style = {{fill: "rgba(0, 0, 0, 0)"}} />
               </clipPath>

               <filter id="glow">
                   <feGaussianBlur stdDeviation="10.5" result="coloredBlur"/>
                   <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                   </feMerge>
               </filter>

               <polygon points = {stringPolygon} style = {{ clipPath: "url(#" + pathId + ")", pointerEvents: "none", fill: this.props.inp.color, fillOpacity: 1,
                                                            stroke: this.props.inp.color, strokeWidth: 0.5}} />
            </svg>

      )
   }
}

export {MapTile};


/*
function prepareVoronoiResult(voronoiResult, mapScale) {
   var polygonList = []
   for (var i = 0; i < voronoiResult.length; i++) {

      var stringPolygon = ""
      for (var j = 0; j < voronoiResult[i].length; j++) {

         stringPolygon += (voronoiResult[i][j][0] * mapScale).toString() + "," + (voronoiResult[i][j][1] * mapScale).toString() + " "
      }
      polygonList.push(stringPolygon)
   }
   return polygonList
}
*/
