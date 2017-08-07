import React, { Component } from 'react';



class Selector extends React.Component {
   /*props: an object of the class InpSelector
   */

   render() {
      const width = this.props.inp.width;
      const height = this.props.inp.height;

      return (
         <div style = {{position: "absolute", pointerEvents: "none", left: -width/2, top: -height/2}}>
            <svg style = {{position: "relative", width: width, height: height}}>
               <line x1 = {0} y1 = {0} x2 = {0} y2 = {height} style = {{stroke: "rgba(100,130,180,0.8)", strokeWidth: 3}} />
               <line x1 = {0} y1 = {0} x2 = {width / 6} y2 = {0} style = {{stroke: "rgba(100,110,230,0.8)", strokeWidth: 3}} />
               <line x1 = {0} y1 = {height} x2 = {width / 6} y2 = {height} style = {{stroke: "rgba(0,110,230,0.8)", strokeWidth: 3}} />

               <line x1 = {width} y1 = {0} x2 = {width} y2 = {height} style = {{stroke: "rgba(100,130,180,0.8)", strokeWidth: 3}} />
               <line x1 = {width} y1 = {0} x2 = {width - width / 6} y2 = {0} style = {{stroke: "rgba(100,110,230,0.8)", strokeWidth: 3}} />
               <line x1 = {width} y1 = {height} x2 = {width - width / 6} y2 = {height} style = {{stroke: "rgba(100,110,230,0.8)", strokeWidth: 3}} />
            </svg>
         </div>
      )
   }
}

export {Selector};
