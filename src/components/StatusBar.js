import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesStatusBar.js'

class StatusBar extends React.Component {

   render() {

      var displayList = [];
      for (var i = 0; i < this.props.contents.length; i++) {
         var displayContent = this.props.contents[i];

         displayList.push( <div style = {{fontSize: this.props.height}} key = {i}>
                              {displayContent}
                           </div>)

      }
      const topShift = -(this.props.height + this.props.distance)
      var divStyle = {position: "absolute", transform: "translate(-50%, 0%)", top: topShift, display: "flex", justifyContent: "center", whiteSpace: "nowrap"}
      return (
         <div id = "StatusBar" style = {divStyle}>

            {displayList}

         </div>
      )
   }
}

StatusBar.propTypes = propTypesTemplate;
export {StatusBar};
