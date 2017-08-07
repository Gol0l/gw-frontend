import React, { Component } from 'react';

function MapLine (props) {

   return<line x1 = {props.inp.points[0][0]}
               y1 = {props.inp.points[0][1]}
               x2 = {props.inp.points[1][0]}
               y2 = {props.inp.points[1][1]}
               style = {{stroke: "rgba(255,255,255,0.3)", strokeWidth: 2}} />
}

export {MapLine};
