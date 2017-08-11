import React, { Component } from 'react';
import "../style/gw-style.css"


class Selector extends React.Component {
   /*props: an object of the class InpSelector
   */

   render() {
      const width = this.props.inp.width;
      const height = this.props.inp.height;
      const isOpened = this.props.inp.isOpened;


      return (


         <div className = {(isOpened) ? "animation-frame-open" : "animation-frame-close"}
                              style = {{position: "absolute", width: width, height: height, transform: "translate("+ Math.round(-width/2).toString() + "px, "
                                                                                                                  + Math.round(-height/2).toString() + "px)"}}>
            <svg id = "animatedChild" className = "animated-child" viewbox='0 0 50 50' preserveAspectRatio='none' stroke='rgba(160, 160, 255, 1)' strokeWidth = "3px">
               <line x1="0%" y1="0%" x2="20%" y2="0%" />
               <line x1="0%" y1="0%" x2="0%" y2="100%" />
               <line x1="0%" y1="100%" x2="20%" y2="100%" />
               <line x1="80%" y1="0%" x2="100%" y2="0%" />
               <line x1="80%" y1="100%" x2="100%" y2="100%" />
               <line x1="100%" y1="0%" x2="100%" y2="100%" />
            </svg>
         </div>
      )
   }
}

export {Selector};
