import React, { Component } from 'react';


class Satellite extends React.Component {
   /*props: an object of the class InpSatellite
   */
   constructor(props) {
      super(props);

      const gravPar = this.props.inp.settings.gravPar;
      const radius = this.props.inp.radius;
      const start = this.props.inp.start;
      this.state = {
         angle: (isNaN(start) ? Math.random() * 2 * Math.PI
                              : start % (2 * Math.PI)),
         angularSpeed: Math.sqrt(gravPar / Math.pow(radius, 3)),
         rotation: 0
      };

      this.updateAngle = this.updateAngle.bind(this);
   }

   componentDidMount() {
      const fps = this.props.inp.settings.fps;
      var intervalID = setInterval(this.updateAngle, Math.floor(1000 / fps));
      this.setState({intervalID: intervalID});
   }

   componentWillUnmount() {
      clearInterval(this.state.intervalID);

   }

   updateAngle() {
      const angle = this.state.angle;
      const angularSpeed = this.state.angularSpeed;
      const simSpeed = this.props.inp.settings.simSpeed;
      const fps = this.props.inp.settings.fps;
      var newAngle = (angle + angularSpeed * simSpeed / fps) % (2 * Math.PI);

      const spin = this.props.inp.spin / fps * 360
      var newRotation = (this.state.rotation + spin) % 360
      this.setState({angle: newAngle,
                     rotation: newRotation});
   }

   render() {
      const objectSize = this.props.inp.size;
      const content = this.props.inp.content;
      const displayScale = this.props.inp.settings.displayScale;
      const radius = this.props.inp.radius;

      const divStyle = {position: "absolute",
                        transform: "translate("
                        + (displayScale * (radius * Math.cos(this.state.angle) - objectSize/2)).toString() + "px,"
                        + (displayScale * (radius * Math.sin(this.state.angle) - objectSize/2)).toString() + "px)"
                        + " "
                        + "rotate(" + this.state.rotation.toString() + "deg)",
                        width: Math.round(objectSize * displayScale),
                        height: Math.round(objectSize * displayScale),
                        //
                        };

      return (
         <div style = {divStyle}>
            {content}
         </div>
      )

   }
}
export {Satellite};
