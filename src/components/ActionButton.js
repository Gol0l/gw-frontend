import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class ActionButton extends React.Component {

   constructor(props) {
      super(props);
      this.state = {left: 0};

   this.allowUpdate = true;
   this.handleClick = this.handleClick.bind(this)
   }

   handleClick() {
      this.props.inp.buttonFunction();
   }

   componentDidMount() {
      var width = ReactDOM.findDOMNode(this.node).getBoundingClientRect().width;
      this.setState({left: -width / 2});
      this.allowUpdate = false;
   }

   componentDidUpdate() {
      if (this.allowUpdate) {
         var width = ReactDOM.findDOMNode(this.node).getBoundingClientRect().width;
         this.setState({left: -width / 2});
         this.allowUpdate = false;
      }
   }
   componentWillReceiveProps() {
      this.allowUpdate = true;
   }


   render() {
      const buttonType = this.props.inp.buttonType;

      var displayButton = <div></div>

      switch (buttonType) {
         case "startAttack":
            displayButton = <div id="actionButton" className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeButton themeShadowDefault"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
                               START ASSAULT
      		                </div>
            break;
         case "greyedStartAttack":
            displayButton = <div id="actionButton" className = "themeBackgroundGrey themeBorderGrey themeTextDefault themeButton themeShadowGrey"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
      		                   START ASSAULT
      		                </div>
            break;
         case "joinAttack":
            displayButton = <div id="actionButton" className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeButton themeShadowDefault"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
      		                   JOIN ASSAULT
      		                </div>
            break;
         case "greyedJoinAttack":
            displayButton = <div id="actionButton" className = "themeBackgroundGrey themeBorderGrey themeTextDefault themeButton themeShadowGrey"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
      		                   JOIN ASSAULT
      		                </div>
            break;
         case "joinDefense":
            displayButton = <div id="actionButton" className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeButton themeShadowDefault"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
      		                   JOIN DEFENSE
      		                </div>
            break;
         case "greyedJoinDefense":
            displayButton = <div id="actionButton" className = "themeBackgroundGrey themeBorderGrey themeTextDefault themeButton themeShadowGrey"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
         		                JOIN DEFENSE
      		                </div>
            break;
         case "leaveLobby":
            displayButton = <div id="actionButton" className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeButton themeShadowDefault"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
         		                LEAVE
      		                </div>
            break;
         case "battleOngoing":
            displayButton = <div ref = {(node) => this.node = node} onClick = {this.handleClick}></div>
            break;
         case "noDisplay":
            displayButton = <div ref = {(node) => this.node = node} onClick = {this.handleClick}></div>
            break;
         default:
            displayButton = <div id="actionButton" className = "themeBackgroundGrey themeBorderGrey themeTextDefault themeButton themeShadowGrey"
                                 style = {{left: this.state.left}} ref = {(node) => this.node = node} onClick = {this.handleClick}>
      		                   error occured
      		                </div>
            break;
      }

      return (
         <div>
            {displayButton}
         </div>
      )
   }
}

export {ActionButton};
