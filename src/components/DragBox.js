import React, { Component } from 'react';

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
         var newLeft = this.props.inp.left;
         var newTop = this.props.inp.top;
         var maxDragAccelerationfactor = 1;
         var dragAccelerationFactor = 1 + maxDragAccelerationfactor * (Math.abs(window.innerWidth / 2 - e.pageX) / window.innerWidth + Math.abs(window.innerHeight / 2 - e.pageY) / window.innerHeight);
         newTop = (e.pageY - this.state.mouseGrabPosY) * dragAccelerationFactor + this.state.lastOffsetTop;
         newLeft = (e.pageX - this.state.mouseGrabPosX) * dragAccelerationFactor + this.state.lastOffsetLeft;

         const minLeft = (isNaN(this.props.inp.minLeft)) ? -10000 : this.props.inp.minLeft;
         const minTop = (isNaN(this.props.inp.minTop)) ? -10000 : this.props.inp.minTop;
         const maxLeft = (isNaN(this.props.inp.maxLeft)) ? 10000 : this.props.inp.maxLeft;
         const maxTop = (isNaN(this.props.inp.maxTop)) ? 10000 : this.props.inp.maxTop;

         newTop = (newTop > maxTop) ? maxTop : newTop;
         newTop = (newTop < minTop) ? minTop : newTop;
         newLeft = (newLeft > maxLeft) ? maxLeft : newLeft;
         newLeft = (newLeft < minLeft) ? minLeft : newLeft;

      this.props.inp.returnShiftedPosition(newLeft, newTop)
      }
   }


   render() {
      const content = this.props.inp.content;
      const divStyle = {top: this.props.inp.top,
                        left: this.props.inp.left};

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


export {DragBox};
