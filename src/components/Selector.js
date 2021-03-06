import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesSelector.js'


class Selector extends React.Component {

   render() {
      const width = this.props.width;
      const height = this.props.height;
      const isOpened = this.props.isOpened;


      return (


         <div className = {(isOpened) ? "animation-frame-open" : "animation-frame-close"}
                              style = {{position: "absolute", width: width, height: height, transform: "translate("+ Math.round(-width/2).toString() + "px, "
                                                                                                                  + Math.round(-height/2).toString() + "px)"}}>
            <svg id = "animatedChild" className = "animated-child" style = {{position: "absolute"}} preserveAspectRatio='none' strokeWidth = "3px">
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

Selector.propTypes = propTypesTemplate;
export {Selector};
