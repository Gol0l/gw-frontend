import React, { Component } from 'react';
import '../style/gw-style.css';


class BattleLobby extends React.Component {
   /*props: an object of the class InpSelector
   */
   constructor(props) {
      super(props);

   }

   render() {
      var teams = [];
      const battleParticipants = this.props.inp.battleParticipants;
      for (var i = 0; i < battleParticipants.length; i++) {
         teams.push(	<span style={{fontWeight: "bold"}}>{battleParticipants[i].factionName}</span>)

         for (var j = 0; j < this.props.inp.maxPlayers/2; j++) {
            teams.push(  <div className="themeBorderDefault playerSlot">
                           {(battleParticipants[i].players[j]) ? battleParticipants[i].players[j] : "empty"}
                        </div>);
         }
      }
      var testList = [<div>hello</div>]
      var testList2 = [[<div>hello</div>]]
      return (

   		<div id='lobbybox' className="themeBackgroundDefault themeBorderDefault themeTextDefault themeShadowDefault">
            LOBBY <span style = {{float: "right"}}>{this.props.inp.timeToBattle}</span> <br/>
   			{teams}

   		</div>
      )
   }
}

export {BattleLobby};
