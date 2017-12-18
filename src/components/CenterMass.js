import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {propTypesTemplate} from '../templates/typesCenterMass.js'


class CenterMass extends React.Component {
   /*props: an object of the class InpCenterMass
   */
   constructor(props) {
      super(props);

      this.state = {
         brightness: this.props.brightness
      };
   this.handleMouseEnter = this.handleMouseEnter.bind(this);
   this.handleMouseLeave = this.handleMouseLeave.bind(this);

   }

   handleMouseEnter() {
      var newBrightness = this.state.brightness + 1;
      this.setState({brightness: newBrightness});
   }

   handleMouseLeave() {
      var newBrightness = this.props.brightness;
      this.setState({brightness: newBrightness});

   }



   render() {
      const width = this.props.width;
      const height = this.props.height;
      const brightness = this.state.brightness;
      const color = this.props.color;
      const coronaColor = this.props.coronaColor;

      return (
         <div style = {{position: "relative"}}>
            <div style = {{position: "relative",
                           width: width,
                           height: height,
                           background: color,
                           borderRadius: "50%",
                           boxShadow: "0px 0px " + (brightness * 4).toString()+"px " + (brightness).toString() + "px " + coronaColor.toString()
                        }}
                  onMouseEnter = {this.handleMouseEnter}
                  onMouseLeave = {this.handleMouseLeave}>

            </div>



         </div>
      )
   }
}

CenterMass.propTypes = propTypesTemplate;
export {CenterMass};
