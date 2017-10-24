import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class StatusBar extends React.Component {

   render() {

      var displayList = [];
      for (var i = 0; i < this.props.inp.contents.length; i++) {
         var displayContent = this.props.inp.contents[i];

         displayList.push( <div style = {{fontSize: this.props.inp.height}} key = {i}>
                              {displayContent}
                           </div>)

      }
      const topShift = -(this.props.inp.height + this.props.inp.distance)
      var divStyle = {position: "absolute", transform: "translate(-50%, 0%)", top: topShift, display: "flex", justifyContent: "center", whiteSpace: "nowrap"}
      return (
         <div id = "StatusBar" style = {divStyle}>

            {displayList}

         </div>
      )
   }
}

export {StatusBar};
