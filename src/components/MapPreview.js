import React, { Component } from 'react';


class MapPreview extends React.Component {
   /*props: an object of the class InpSelector
   */
   constructor(props) {
      super(props);

   }

   render() {
      var displayString =   this.props.inp.mapName.toString() + " - "
                        + this.props.inp.maxPlayers.toString() + "v" + this.props.inp.maxPlayers.toString() + " - "
                        + this.props.inp.mapSize.toString() + "km"


      return (
         <div id='mapbox' className = "themeBackgroundDefault themeBorderDefault themeTextDefault themeShadowDefault">
   			{displayString}
   			<img  id='map' className = "themeBorderDefault" src = {require("../img/" + this.props.inp.mapImg)} />
   		</div>
      )
   }
}

export {MapPreview};
