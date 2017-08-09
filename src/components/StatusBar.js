import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*props: an object of the class InpStatusBar
*/
class StatusBar extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         left: "0px"
      };

      this.nodes = [];


   }

   componentDidMount() {

      //console.log("mounting component", this.nodes[0].offsetWidth)
      const height = this.props.inp.height;
      var newWidth = 0
      for (var i = 0; i < this.props.inp.contents.length; i++) {
         var displayContent = this.props.inp.contents[i];

         var rect = ReactDOM.findDOMNode(this.nodes[i]).getBoundingClientRect()
         var zoomFactor = height / rect.height;
         newWidth += rect.width * zoomFactor

      }


      this.setState({left: -1 * newWidth / 2});


   }



   render() {


      var displayList = [];
      for (var i = 0; i < this.props.inp.contents.length; i++) {
         var displayContent = this.props.inp.contents[i];

         displayList.push( <div ref = {(node) => this.nodes.push(node)} style = {{position: "relative", display: "inline-block", fontSize: this.props.inp.height}} key = {i}>
                              {displayContent}
                           </div>)

      }
      const topShift = - (this.props.inp.height + this.props.inp.distance)
      var divStyle = {position: "absolute", left: this.state.left, top: topShift, whiteSpace: "nowrap", lineHeight: "0px"}
      return (
         <div id = "StatusBar" style = {divStyle}>

            {displayList}

         </div>
      )
   }
}

export {StatusBar};
