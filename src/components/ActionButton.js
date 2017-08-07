import React, { Component } from 'react';
import '../style/gw-style.css';



class ActionButton extends React.Component {
   /*props: an object of the class InpSelector
   */
   constructor(props) {
      super(props);

   this.handleClick = this.handleClick.bind(this)
   }

   handleClick = function() {
      this.props.inp.buttonFunction();
   }

   render() {

      return (
         <div id="attack" className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeButton themeShadowDefault" onClick = {this.handleClick}>
   		    {this.props.inp.buttonType}
   		</div>
      )
   }
}

export {ActionButton};
