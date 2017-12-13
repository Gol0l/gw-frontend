import {InputForm} from './InputForm.js'

class InpGalaxyMapSimSettings extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         mapScale: "number",
         systemPositionScale: "number",
         systemScale: "number",
         simSpeed: "number",
         fps: "number",
         baseStarSize: "number",
         basePlanetSize: "number",
         centerMassScalingExponent: "number",
         systemScaleUiThreshold: "number",
         planetScalingExponent: "number",
         planetScaleUiThreshold: "number"
      };

      this.validate(inputObject)


   }
}
export {InpGalaxyMapSimSettings};
