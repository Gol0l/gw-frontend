import React, { Component } from 'react';



class CenterMass extends React.Component {
   /*props: an object of the class InpCenterMass
   */
   constructor(props) {
      super(props);

      this.state = {
         brightness: this.props.inp.brightness
      };
   this.handleMouseEnter = this.handleMouseEnter.bind(this);
   this.handleMouseLeave = this.handleMouseLeave.bind(this);

   }

   handleMouseEnter() {
      var newBrightness = this.state.brightness + 1;
      this.setState({brightness: newBrightness});
   }

   handleMouseLeave() {
      var newBrightness = this.props.inp.brightness;
      this.setState({brightness: newBrightness});

   }



   render() {
      const width = this.props.inp.width;
      const height = this.props.inp.height;
      const brightness = this.state.brightness;
      const color = this.props.inp.color;
      const coronaColor = this.props.inp.coronaColor;

      return (
         <div style = {{position: "relative"}}>
            <div style = {{position: "relative",
                           width: width,
                           height: height,
                           borderRadius: "50%", background: color,
                           boxShadow: "0px 0px " + (brightness * 4).toString()+"px " + (brightness).toString() + "px " + coronaColor.toString()
                        }}
                  onMouseEnter = {this.handleMouseEnter}
                  onMouseLeave = {this.handleMouseLeave}>

            </div>



         </div>
      )
   }
}

export {CenterMass};
