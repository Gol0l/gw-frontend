import React, { Component } from 'react';





class BattleLobby extends React.Component {

   constructor(props) {
      super(props);
      console.log(props.inp);
   }

   render() {
      var teams = [];
      const battleParticipants = this.props.inp.battleParticipants;
      for (var i = 0; i < battleParticipants.length; i++) {
         teams.push(	<span style={{fontWeight: "bold"}} key = {"lobbySpan" + i.toString()}>{battleParticipants[i].factionName}</span>)

         for (var j = 0; j < this.props.inp.maxPlayers/2; j++) {
            teams.push(  <div className="themeBorderDefault playerSlot" key = {"lobbyDiv" + i.toString() + j.toString()}>
                           {(battleParticipants[i].players[j]) ? battleParticipants[i].players[j] : "empty"}
                        </div>);
         }
      }

      return (

   		<div id='lobbybox' className="themeBackgroundDefault themeBorderDefault themeTextDefault themeShadowDefault">
            LOBBY <span style = {{float: "right"}}>{this.props.inp.waitingProgress}</span> <br/>
   			{teams}

   		</div>
      )
   }
}

export {BattleLobby};
