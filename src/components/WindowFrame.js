import React, { Component } from 'react';
import {InpWindowFrame} from '../inpclasses/InpWindowFrame'

function WindowFrame(props) {
   /*props: an object of the class InpWindowFrame
   */
   return (
      <div>
         <div id = "leftFrame" style = {{backgroundColor: props.inp.color, position: "absolute", left: props.inp.left, top: props.inp.top, width: props.inp.leftSize, height: props.inp.height}}> </div>
         <div id = "topFrame" style = {{backgroundColor: props.inp.color, position: "absolute", left: props.inp.left, top: props.inp.top, width: props.inp.width, height: props.inp.topSize}}> </div>
         <div id = "rightFrame" style = {{backgroundColor: props.inp.color, position: "absolute", left: props.inp.left + props.inp.width - props.inp.rightSize, top: props.inp.top, width: props.inp.rightSize, height: props.inp.height}}> </div>
         <div id = "bottomFrame" style = {{backgroundColor: props.inp.color, position: "absolute", left: props.inp.left, top: props.inp.top + props.inp.height - props.inp.bottomSize, width: props.inp.width, height: props.inp.bottomSize}}> </div>
      </div>
   )
}
export {WindowFrame};
