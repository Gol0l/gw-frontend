import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesDragBox.js'


class DragBox extends React.Component {


   constructor(props) {

      super(props);
      this.state = {
         mouseSelect: false,
         mouseGrabPosX: null,
         mouseGrabPosY: null,
         lastOffsetTop: null,
         lastOffsetLeft: null
      };


      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);

   }
   componentDidMount() {

      this.setState({lastOffsetTop: this.node.offsetTop,
                     lastOffsetLeft: this.node.offsetLeft});
   }

   handleMouseDown(e) {

      this.setState({mouseSelect: true,
                     mouseGrabPosX: e.pageX,
                     mouseGrabPosY: e.pageY,
                     lastOffsetTop: this.node.offsetTop,
                     lastOffsetLeft: this.node.offsetLeft});
   }

   handleMouseUp(e) {

      this.setState({mouseSelect: false,
                     mouseGrabPosX: null,
                     mouseGrabPosY: null,});
   }

   handleMouseMove(e) {

      if (this.state.mouseSelect) {
         var newLeft = this.props.left;
         var newTop = this.props.top;
         var maxDragAccelerationfactor = 1;
         var dragAccelerationFactor = 1 + maxDragAccelerationfactor * (Math.abs(window.innerWidth / 2 - e.pageX) / window.innerWidth + Math.abs(window.innerHeight / 2 - e.pageY) / window.innerHeight);
         newTop = (e.pageY - this.state.mouseGrabPosY) * dragAccelerationFactor + this.state.lastOffsetTop;
         newLeft = (e.pageX - this.state.mouseGrabPosX) * dragAccelerationFactor + this.state.lastOffsetLeft;

         const minLeft = (isNaN(this.props.minLeft)) ? -10000 : this.props.minLeft;
         const minTop = (isNaN(this.props.minTop)) ? -10000 : this.props.minTop;
         const maxLeft = (isNaN(this.props.maxLeft)) ? 10000 : this.props.maxLeft;
         const maxTop = (isNaN(this.props.maxTop)) ? 10000 : this.props.maxTop;

         newTop = (newTop > maxTop) ? maxTop : newTop;
         newTop = (newTop < minTop) ? minTop : newTop;
         newLeft = (newLeft > maxLeft) ? maxLeft : newLeft;
         newLeft = (newLeft < minLeft) ? minLeft : newLeft;

      this.props.returnShiftedPosition(newLeft, newTop)
      }
   }


   render() {
      const content = this.props.content;
      const divStyle = {top: this.props.top,
                        left: this.props.left};

      return (
         <div  style = {{  position: "absolute",
                           left: divStyle.left, top: divStyle.top}}
               ref = {node => this.node = node} onMouseDown = {this.handleMouseDown}
                                                onMouseUp = {this.handleMouseUp}
                                                onMouseMove = {this.handleMouseMove}>
            {content}
         </div>
      );
   };
}

DragBox.propTypes = propTypesTemplate;
export {DragBox};
