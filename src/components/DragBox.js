import React, { Component } from 'react';

class DragBox extends React.Component {

   /*props: left
            top
            content
            width
            heeight
            minLeft
            minTop
            maxLeft
            maxTop
   */
   constructor(props) {

      super(props);
      this.state = {
         dynamicStyle: {width: (isNaN(this.props.inp.width)) ? "auto" : this.props.inp.width,
                        height: (isNaN(this.props.inp.height)) ? "auto" : this.props.inp.height,
                        top: (isNaN(this.props.inp.top)) ? 0 : this.props.inp.top,
                        left: (isNaN(this.props.inp.left)) ? 0 : this.props.inp.left},
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
      var tempDynamicStyle = this.state.dynamicStyle;
      tempDynamicStyle.width = this.node.offsetWidth;
      tempDynamicStyle.height = this.node.offsetHeight;
      this.setState({dynamicStyle: tempDynamicStyle,
                     lastOffsetTop: this.node.offsetTop,
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
         var tempDynamicStyle = this.state.dynamicStyle;

         tempDynamicStyle.top = e.pageY - this.state.mouseGrabPosY + this.state.lastOffsetTop;
         tempDynamicStyle.left = e.pageX - this.state.mouseGrabPosX + this.state.lastOffsetLeft;

         const minLeft = (isNaN(this.props.inp.minLeft)) ? -10000 : this.props.inp.minLeft;
         const minTop = (isNaN(this.props.inp.minTop)) ? -10000 : this.props.inp.minTop;
         const maxLeft = (isNaN(this.props.inp.maxLeft)) ? 10000 : this.props.inp.maxLeft;
         const maxTop = (isNaN(this.props.inp.maxTop)) ? 10000 : this.props.inp.maxTop;

         tempDynamicStyle.top = (tempDynamicStyle.top > maxTop) ? maxTop : tempDynamicStyle.top;
         tempDynamicStyle.top = (tempDynamicStyle.top < minTop) ? minTop : tempDynamicStyle.top;
         tempDynamicStyle.left = (tempDynamicStyle.left > maxLeft) ? maxLeft : tempDynamicStyle.left;
         tempDynamicStyle.left = (tempDynamicStyle.left < minLeft) ? minLeft : tempDynamicStyle.left;


         this.setState({dynamicStyle: tempDynamicStyle});
      }
   }


   render() {
      const content = this.props.inp.content;
      const divStyle = Object.assign(this.state.dynamicStyle, {position: "absolute"});

      return (
         <div style = {divStyle} ref = {node => this.node = node} onMouseDown = {this.handleMouseDown}
                                                                  onMouseUp = {this.handleMouseUp}
                                                                  onMouseMove = {this.handleMouseMove}>
            {content}
         </div>
      );
   };
}


export {DragBox};
