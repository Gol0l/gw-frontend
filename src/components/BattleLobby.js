import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesBattleLobby.js'


class BattleLobby extends React.Component {

   constructor(props) {
      super(props);
      console.log(props.inp);
   }

   render() {
      var teams = [];
      const battleParticipants = this.props.battleParticipants;
      for (var i = 0; i < battleParticipants.length; i++) {
         teams.push(	<span style={{fontWeight: "bold"}} key = {"lobbySpan" + i.toString()}>{battleParticipants[i].factionName}</span>)

         for (var j = 0; j < this.props.maxPlayers/2; j++) {
            teams.push(  <div className="themeBorderDefault playerSlot" key = {"lobbyDiv" + i.toString() + j.toString()}>
                           {(battleParticipants[i].players[j]) ? battleParticipants[i].players[j] : "empty"}
                        </div>);
         }
      }

      return (

   		<div id='lobbybox' className="themeBackgroundDefault themeBorderDefault themeTextDefault themeShadowDefault">
            LOBBY <span style = {{float: "right"}}>{this.props.waitingProgress}</span> <br/>
   			{teams}

   		</div>
      )
   }
}

BattleLobby.propTypes = propTypesTemplate;
export {BattleLobby};
