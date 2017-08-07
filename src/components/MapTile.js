import React, { Component } from 'react';

function MapTile (props) {
   /*props: points
   */

   return (<polygon points = {props.inp.points} style = {{pointerEvents: "none", fill: props.inp.color, stroke: "rgba(70, 70, 70, 100)", strokeWidth: 2}} />)
}

export {MapTile};
