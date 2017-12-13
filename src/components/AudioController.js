import React, { Component } from 'react';




class AudioController extends React.Component {
   constructor() {
      super();
      this.state = { immersion: 0.0,
                     volume: 0.5,
                     mouseDown: false}

      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
      this.handleImmersionMouseMove = this.handleImmersionMouseMove.bind(this);
      this.handleAudioEnd = this.handleAudioEnd.bind(this);
      this.attachEventListener = this.attachEventListener.bind(this);
      this.playbackAudio = this.playbackAudio.bind(this);
      this.audioResolution = 10

      this.audioContainer = [
         {
            audio: new Audio(require('../sounds/hum1.mp3')),
            volume: 0.3,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/LargePowerSourceLoop.wav')),
            volume: 0.3,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceShipBridgeLoop.wav')),
            volume: 0.3,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/MartianAtmosphere.wav')),
            volume: 0.3,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/TelemetryLoop.wav')),
            volume: 0.2,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/WarningBeep.wav')),
            volume: 1,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/StrongMagneticFieldLoop.wav')),
            volume: 0.5,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/LargeIndustrialFanLoop.wav')),
            volume: 0.5,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/ShuttleFlyBy01.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/ShuttleFlyBy02.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceAgeMotorCycle03.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceShipFlyBy01.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceShipFlyBy07.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceShipFlyBy02.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/SpaceAgeMotorCycle02.wav')),
            volume: 0.7,
            stack: 0
         },
         {
            audio: new Audio(require('../sounds/ShuttleFlyBy04.wav')),
            volume: 0.7,
            stack: 0
         }

      ]
      for (var i = 0; i < this.audioContainer.length; i++) {
         this.attachEventListener(this.audioContainer[i].audio, i)
      }
   }

   attachEventListener(elem, index) {
      var self = this;
      elem.addEventListener('ended', function() {self.handleAudioEnd(this, index)}, false)
   }

   handleAudioEnd(target, index) {
      this.audioContainer[index].stack -= 1;
      if (this.audioContainer[index].stack > 0) {
         target.currentTime = 0;
         target.play();
      }
   }
   componentDidMount() {
      this.intervalId = setInterval(this.playbackAudio, Math.floor(1000 / this.audioResolution));
   }

   componentWillUnmount() {
      clearInterval(this.intervalId);
   }

   playbackAudio() {
      const frequency = this.audioResolution;
      const immersion = this.state.immersion;
      switch (Math.round(this.state.immersion * 7)) {
         case 0.0:
            break;
         case 1:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            break;
         case 2:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            if (randBoolean(1/(50 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[5].audio.play()
            }
            break;
         case 3:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            this.audioContainer[2].stack = 1;
            this.audioContainer[2].audio.play()
            if (randBoolean(1/(50 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[5].audio.play()
            }
            break;
         case 4:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            this.audioContainer[2].stack = 1;
            this.audioContainer[2].audio.play()
            this.audioContainer[3].stack = 1;
            this.audioContainer[3].audio.play()
            if (randBoolean(1/(45 * frequency)) && this.audioContainer[4].stack <= 0) {
               this.audioContainer[4].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[4].audio.play()
            }
            if (randBoolean(1/(24 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[5].audio.play()
            }
            if (randBoolean(1/(25 * frequency)) && this.audioContainer[6].stack <= 0) {
               this.audioContainer[6].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[6].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[7].stack <= 0) {
               this.audioContainer[7].stack = 1 + Math.floor(Math.random() * 2 * immersion);
               this.audioContainer[7].audio.play()
            }

            break;
         case 5:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            this.audioContainer[2].stack = 1;
            this.audioContainer[2].audio.play()
            this.audioContainer[3].stack = 1;
            this.audioContainer[3].audio.play()
            if (randBoolean(1/(45 * frequency)) && this.audioContainer[4].stack <= 0) {
               this.audioContainer[4].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[4].audio.play()
            }
            if (randBoolean(1/(24 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[5].audio.play()
            }
            if (randBoolean(1/(25 * frequency)) && this.audioContainer[6].stack <= 0) {
               this.audioContainer[6].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[6].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[7].stack <= 0) {
               this.audioContainer[7].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[7].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[8].stack <= 0) {
               this.audioContainer[8].stack = 1
               this.audioContainer[8].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[9].stack <= 0) {
               this.audioContainer[9].stack = 1
               this.audioContainer[9].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[10].stack <= 0) {
               this.audioContainer[10].stack = 1
               this.audioContainer[10].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[14].stack <= 0) {
               this.audioContainer[14].stack = 1
               this.audioContainer[14].audio.play()
            }
            if (randBoolean(1/(120 * frequency)) && this.audioContainer[15].stack <= 0) {
               this.audioContainer[15].stack = 1
               this.audioContainer[15].audio.play()
            }

            break;
         case 6:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            this.audioContainer[2].stack = 1;
            this.audioContainer[2].audio.play()
            this.audioContainer[3].stack = 1;
            this.audioContainer[3].audio.play()
            if (randBoolean(1/(45 * frequency)) && this.audioContainer[4].stack <= 0) {
               this.audioContainer[4].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[4].audio.play()
            }
            if (randBoolean(1/(24 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[5].audio.play()
            }
            if (randBoolean(1/(25 * frequency)) && this.audioContainer[6].stack <= 0) {
               this.audioContainer[6].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[6].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[7].stack <= 0) {
               this.audioContainer[7].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[7].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[8].stack <= 0) {
               this.audioContainer[8].stack = 1
               this.audioContainer[8].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[9].stack <= 0) {
               this.audioContainer[9].stack = 1
               this.audioContainer[9].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[10].stack <= 0) {
               this.audioContainer[10].stack = 1
               this.audioContainer[10].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[11].stack <= 0) {
               this.audioContainer[11].stack = 1
               this.audioContainer[11].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[12].stack <= 0) {
               this.audioContainer[12].stack = 1
               this.audioContainer[12].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[13].stack <= 0) {
               this.audioContainer[13].stack = 1
               this.audioContainer[13].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[14].stack <= 0) {
               this.audioContainer[14].stack = 1
               this.audioContainer[14].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[15].stack <= 0) {
               this.audioContainer[15].stack = 1
               this.audioContainer[15].audio.play()
            }

            break;

         case 7:
            this.audioContainer[0].stack = 1;
            this.audioContainer[0].audio.play()
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[1].stack <= 0) {
               this.audioContainer[1].stack = 1 + Math.floor(Math.random() * 2);
               this.audioContainer[1].audio.play()
            }
            this.audioContainer[2].stack = 1;
            this.audioContainer[2].audio.play()
            this.audioContainer[3].stack = 1;
            this.audioContainer[3].audio.play()
            if (randBoolean(1/(24 * frequency)) && this.audioContainer[4].stack <= 0) {
               this.audioContainer[4].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[4].audio.play()
            }
            if (randBoolean(1/(45 * frequency)) && this.audioContainer[5].stack <= 0) {
               this.audioContainer[5].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[5].audio.play()
            }
            if (randBoolean(1/(25 * frequency)) && this.audioContainer[6].stack <= 0) {
               this.audioContainer[6].stack = 1 + Math.floor(Math.random() * 5 * immersion);
               this.audioContainer[6].audio.play()
            }
            if (randBoolean(1/(60 * frequency)) && this.audioContainer[7].stack <= 0) {
               this.audioContainer[7].stack = 1 + Math.floor(Math.random() * 3 * immersion);
               this.audioContainer[7].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[8].stack <= 0) {
               this.audioContainer[8].stack = 1
               this.audioContainer[8].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[9].stack <= 0) {
               this.audioContainer[9].stack = 1
               this.audioContainer[9].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[10].stack <= 0) {
               this.audioContainer[10].stack = 1
               this.audioContainer[10].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[11].stack <= 0) {
               this.audioContainer[11].stack = 1
               this.audioContainer[11].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[12].stack <= 0) {
               this.audioContainer[12].stack = 1
               this.audioContainer[12].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[13].stack <= 0) {
               this.audioContainer[13].stack = 1
               this.audioContainer[13].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[14].stack <= 0) {
               this.audioContainer[14].stack = 1
               this.audioContainer[14].audio.play()
            }
            if (randBoolean(1/(20 * frequency)) && this.audioContainer[15].stack <= 0) {
               this.audioContainer[15].stack = 1
               this.audioContainer[15].audio.play()
            }
         default:
            break;
      }
   }

   adjustVolume() {
      for (var i = 0; i < this.audioContainer.length; i++) {
         if (this.state.volume * this.audioContainer.volume <= 0) {
            this.audioContainer[i].audio.muted = true;
         }
         else {
            this.audioContainer[i].audio.muted = false;
            this.audioContainer[i].audio.volume = this.state.volume * this.audioContainer[i].volume;
         }
      }
   }

   handleMouseMove(e, type) {
      if(this.state.mouseDown) {
         switch(type) {
            case "immersion":
               var rect = this.immersionNode.getBoundingClientRect()
               var value = (e.clientX - rect.left) / rect.width;
               if (value > 1) {
                  value = 1;
               }
               if (value < 0) {
                  value = 0;
               }
               this.setState({immersion: value});
               break;
            case "volume":
               var rect = this.volumeNode.getBoundingClientRect()
               var value = (e.clientX - rect.left) / rect.width;
               if (value > 1) {
                  value = 1;
               }
               if (value < 0) {
                  value = 0;
               }
               this.setState({volume: value});
               this.adjustVolume()
               break;
            default:
               console.log("audioError")
         }
      }
   }
   handleVolumeMouseMove(e) {
      this.handleMouseMove(e, "volume")
   }

   handleImmersionMouseMove(e) {
      this.handleMouseMove(e, "immersion")
   }
   render() {

      return (
         <div id='audiobox' className="themeBackgroundNoHover themeBorderDefault themeShadowDefault" style = {{lineHeight: 0.5}}>
            <div  className="themeBorderDefault themeShadowDefault themeHoverDefault"
                  style = {{position: "absolute", left: "49%", width: "47%", height: "31%", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "2px"}}
                  onMouseMove = {this.handleImmersionMouseMove} onMouseDown = {() => this.setState({mouseDown: true})} onMouseUp = {() => this.setState({mouseDown: false})} onMouseLeave = {() => this.setState({mouseDown: false})}
                  ref = {(node) => this.immersionNode = node}>
               <div style = {{position: "absolute", left: "0%", top: "4%", width: (this.state.immersion * 100).toString() + "%", height: "92%", backgroundColor: "rgba(225, 225, 255, 0.5)", borderRadius: "2px"}}>
               </div>
            </div>
            <div className="themeTextDefault" style = {{width: "40%", padding: "5px"}}>
               Immersion
            </div>
            <br/>
            <div  className="themeBorderDefault themeShadowDefault themeHoverDefault"
                  style = {{position: "absolute", left: "49%", width: "47%", height: "31%", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "2px"}}
                  onMouseMove = {this.handleVolumeMouseMove} onMouseDown = {() => this.setState({mouseDown: true})} onMouseUp = {() => this.setState({mouseDown: false})} onMouseLeave = {() => this.setState({mouseDown: false})}
                  ref = {(node) => this.volumeNode = node}>
               <div style = {{position: "absolute", left: "0%", top: "4%", width: (this.state.volume * 100).toString() + "%", height: "92%", backgroundColor: "rgba(225, 225, 255, 0.5)", borderRadius: "2px"}}>
               </div>
            </div>
            <div className="themeTextDefault" style = {{width: "40%", padding: "5px"}}>
               Volume
            </div>
         </div>
      )
   }
}

export {AudioController};


function randBoolean(probability) {
   return ((Math.random() < probability) ? true : false)
}
