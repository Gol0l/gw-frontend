import React, { Component } from 'react';
import {MapPreview} from './MapPreview.js';
import {InpMapPreview} from '../inpclasses/InpMapPreview.js'
import {BattleLobby} from './BattleLobby.js';
import {InpBattleLobby} from '../inpclasses/InpBattleLobby.js'
import {ActionButton} from './ActionButton.js';
import {InpActionButton} from '../inpclasses/InpActionButton.js'


class InfoBar extends React.Component {
   /*props: an object of the class InpSelector
   */
   constructor(props) {
      super(props);

   }

   render() {
      var divStyle = {  position: "absolute"};
      const mapPreviewHeight = this.props.inp.height;

      const battleLobbyHeight = this.props.inp.height;
      const battleLobbyWidth = this.props.inp.height * 1.66;

      const attackButtonHeight = this.props.inp.height * 0.5;

      return (
         <div id = "infobar" style = {divStyle}>
            <div style = {{position: "absolute", left: 0, top: 0}}>
               <MapPreview inp = {new InpMapPreview({ height: mapPreviewHeight,
                                                      mapName: this.props.inp.mapInfo.mapName,
                                                      mapSize: this.props.inp.mapInfo.mapSize,
                                                      mapImg: this.props.inp.mapInfo.mapImg,
                                                      maxPlayers: this.props.inp.mapInfo.maxPlayers})} />
            </div>
            <div style = {{position: "absolute", left: this.props.inp.width / 2, top: this.props.inp.height - attackButtonHeight}}>
               <ActionButton inp = {new InpActionButton({height: attackButtonHeight,
                                                         buttonType: this.props.inp.buttonType,
                                                         buttonFunction: this.props.inp.buttonFunction})} />
            </div>
            <div style = {{position: "absolute", left: this.props.inp.width - battleLobbyWidth, top: 0}}>
               <BattleLobby inp = {new InpBattleLobby({  width: battleLobbyWidth,
                                                         height: battleLobbyHeight,
                                                         battleParticipants: this.props.inp.battleInfo.battleParticipants,
                                                         status: this.props.inp.battleInfo.status,
                                                         timeToBattle: this.props.inp.battleInfo.timeToBattle})} />
            </div>
         </div>
      )
   }
}

export {InfoBar};
