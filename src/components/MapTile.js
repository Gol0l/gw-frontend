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

      return (<polygon points = {stringPolygon} style = {{pointerEvents: "none", fill: this.props.inp.color, stroke: "rgba(70, 70, 70, 0)", strokeWidth: 4}} />)
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
