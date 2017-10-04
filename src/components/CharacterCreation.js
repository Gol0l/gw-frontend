import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class CharacterCreation extends React.Component {

   constructor(props) {
      super(props);
      this.state = { top: 0,
                     characterName: this.props.inp.suggestedName,
                     characterFaction: "default"};

   this.allowUpdate = true;
   this.handleSubmit = this.handleSubmit.bind(this)
   this.uefClicked = this.uefClicked.bind(this);
   this.cybranClicked = this.cybranClicked.bind(this);
   this.aeonClicked = this.aeonClicked.bind(this);
   this.seraphimClicked = this.seraphimClicked.bind(this);

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
      this.props.inp.submitFunction(this.state.characterFaction, this.state.characterName);
   }

   uefClicked = function(event) {
      this.setState({characterFaction: "uef"});
   }

   cybranClicked = function(event) {
      this.setState({characterFaction: "cybran"});
   }

   aeonClicked = function(event) {
      this.setState({characterFaction: "aeon"});
   }

   seraphimClicked = function(event) {
      this.setState({characterFaction: "seraphim"});
   }


   render() {


      var factionImages = [<img key = "uefImg" src = {require('../img/factionLogos/uef.jpeg')} style = {{height: "100%"}} onClick = {this.uefClicked} className = "themeBackgroundDefault themeBorderDefault"/>,
                           <img key = "cybranImg" src = {require('../img/factionLogos/cybran.jpeg')} style = {{height: "100%"}} onClick = {this.cybranClicked} className = "themeBackgroundDefault themeBorderDefault"/>,
                           <img key = "aeonImg" src = {require('../img/factionLogos/aeon.jpeg')} style = {{height: "100%"}} onClick = {this.aeonClicked} className = "themeBackgroundDefault themeBorderDefault"/>,
                           <img key = "seraphimImg" src = {require('../img/factionLogos/seraphim.jpeg')} style = {{height: "100%"}} onClick = {this.seraphimClicked} className = "themeBackgroundDefault themeBorderDefault"/>]

      var displayFaction = "";
      switch (this.state.characterFaction) {
         case "uef":
            displayFaction = "UEF";
            break;
         case "cybran":
            displayFaction = "Cybran";
            break;
         case "aeon":
            displayFaction = "Aeon";
            break;
         case "seraphim":
            displayFaction = "Seraphim";
            break;
         default:
            displayFaction = "";
            break;

      }

      return (
         <div id="loginwrapper">
            <img src={require('../img/background2.jpg')} width = {window.innerWidth} height = {window.innerHeight} style = {{position: "absolute"}}/>
            <div id="loginbox" ref = {(node) => this.node = node} style = {{top: this.state.top, textAlign: "center", position: "relative"}}>
               <div style = {{display: "inline-block", textAlign: "left"}}>
                  <div style = {{textAlign: "center", fontSize: "2em"}} className = "themeTitleDefault">
                     GALACTIC WAR
                  </div>
                  <form onSubmit={this.handleSubmit} style = {{padding: "5px"}} className = "themeBackgroundNoHover themeShadowDefult themeBorderDefault themeTextDefault">
                     <label style = {{display: "flex", justifyContent: "center", height: "2.3em"}} >
                        {factionImages}
                     </label>
                     <br/>
                     <label>
                        your faction: {displayFaction}
                        <br/>
                        <div style={{marginTop: 5, marginBottom: 3}}>your name: {this.state.characterName}</div>


                        <div  className = "themeBackgroundDefault themeShadowDefult themeTextDefault" onClick = {this.props.inp.requestName}
                              style = {{display: "inline-block"}}>
                           new
                        </div>


                     </label>
                     <br/>
                     <input type="submit" value="Join the war" style = {{position: "relative", width: "50%", left: "25%", fontSize: "1em"}}
                            className = "themeBackgroundDefault themeShadowDefult themeBorderDefault themeTextDefault"/>

                  </form>
               </div>
            </div>
            <div id="background" style = {{position: "absolute", left: 0, top: 0, backgroundColor: "rgba(0, 0, 0, 0.2)", width: window.innerWidth, height: window.innerHeight, pointerEvents: "none"}}></div>
         </div>
      )
   }
}

export {CharacterCreation};
