import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesMapPreview.js'

class MapPreview extends React.Component {
   /*props: an object of the class InpSelector
   */
   constructor(props) {
      super(props);

   }

   render() {
      var displayString =   this.props.mapName.toString() + " - "
                        + this.props.maxPlayers.toString() + "v" + this.props.maxPlayers.toString() + " - "
                        + this.props.mapSize.toString() + "km"


      return (
         <div id='mapbox' className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeShadowDefault">
   			{displayString}
   			<img  id='map' className = "themeBorderDefault" src = {require("../img/" + this.props.mapImg)} />
   		</div>
      )
   }
}

MapPreview.propTypes = propTypesTemplate;
export {MapPreview};
