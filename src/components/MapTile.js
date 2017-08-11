import React, { Component } from 'react';

function MapTile (props) {
   /*props: points
   */

   return (<polygon points = {props.inp.points} style = {{pointerEvents: "none", fill: props.inp.color, stroke: "rgba(70, 70, 70, 0)", strokeWidth: 4}} />)
}

export {MapTile};
