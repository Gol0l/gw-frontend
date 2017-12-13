import {InputForm} from './InputForm.js'

class InpSatelliteSettings extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         gravPar: "number",
         displayScale: "number",
         fps: "number",
         simSpeed: "number",
         planetScalingExponent: "number",
         planetScaleUiThreshold: "number"

      };

      this.validate(inputObject)


   }
}
export {InpSatelliteSettings};
