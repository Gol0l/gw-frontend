import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesLoginBox.js'


class LoginBox extends React.Component {

   constructor(props) {
      super(props);
      this.state = { top: 0,
                     name: "",
                     password: ""};

   this.allowUpdate = true;
   this.handleSubmit = this.handleSubmit.bind(this)
   this.handleNameChange = this.handleNameChange.bind(this);
   this.handlePasswordChange = this.handlePasswordChange.bind(this);

   }

   componentDidMount() {
      var height = ReactDOM.findDOMNode(this.node).getBoundingClientRect().height;
      console.log(height);
      this.setState({top: window.innerHeight / 2 - height / 2 - 40});
      this.allowUpdate = false;
   }

   componentDidUpdate() {
      if (this.allowUpdate) {
         var height = ReactDOM.findDOMNode(this.node).getBoundingClientRect().height;
         this.setState({top: window.innerHeight / 2 - height / 2 - 40});
         this.allowUpdate = false;
      }
   }
   componentWillReceiveProps() {
      this.allowUpdate = true;
   }


   handleSubmit = function() {
      this.props.submitFunction(this.state.name, this.state.password);
   }

   handleNameChange = function(event) {
      this.setState({name: event.target.value});
   }

   handlePasswordChange = function(event) {
      this.setState({password: event.target.value});
   }


   render() {

      return (
         <div id="loginwrapper">
            <img src={require('../img/background2.jpg')} width = {window.innerWidth} height = {window.innerHeight} style = {{position: "absolute"}}/>
            <div id="loginbox" ref = {(node) => this.node = node} style = {{top: this.state.top, textAlign: "center", position: "relative"}}>
               <div style = {{display: "inline-block", textAlign: "left"}}>
                  <div style = {{textAlign: "center", fontSize: "2em"}} className = "themeTitleDefault">
                     GALACTIC WAR
                  </div>
                  <form onSubmit={this.handleSubmit} style = {{padding: "5px"}} className = "themeBackgroundNoHover themeShadowDefult themeBorderDefault themeTextDefault">
                     <label>
                        Name:
                        <br/>
                        <textarea value={this.state.name} onChange={this.handleNameChange}
                                   className = "themeTextarea themeBackgroundDefault themeShadowDefult themeBorderDefault themeTextDefault"></textarea>

                     </label>
                     <br/>
                     <label>
                        Password:
                        <br/>
                        <textarea value={this.state.password} onChange={this.handlePasswordChange}
                                   className = "themeTextarea themeBackgroundDefault themeShadowDefult themeBorderDefault themeTextDefault"></textarea>
                     </label>
                     <br/>
                     <input type="submit" value="Login" style = {{marginTop: 3, position: "relative", width: "50%", left: "25%", fontSize: "1em"}}
                            className = "themeBackgroundDefault themeShadowDefult themeBorderDefault themeTextDefault"/>
                  </form>
               </div>
            </div>
            <div id="background" style = {{position: "absolute", left: 0, top: 0, backgroundColor: "rgba(0, 0, 0, 0.2)", width: window.innerWidth, height: window.innerHeight, pointerEvents: "none"}}></div>
         </div>
      )
   }
}

LoginBox.propTypes = propTypesTemplate;
export {LoginBox};
