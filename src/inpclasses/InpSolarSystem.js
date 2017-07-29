import {InputForm} from './InputForm.js'
import {InpSolarSystemSimSettings} from'./InpSolarSystemSimSettings.js'
import {InpSolarSystemCenterMass} from'./InpSolarSystemCenterMass.js'

class InpSolarSystem extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         top: "number",
         left: "number",
         gravPar: "number",
         simSettings: "object",
         planetList: "array",
         centerMass: "object"

      };

      this.validate(inputObject)

      inputObject.simSettings = new InpSolarSystemSimSettings(inputObject.simSettings)

      inputObject.centerMass = new InpSolarSystemCenterMass(inputObject.centerMass)

      this.assign(inputObject)


   }
}
export {InpSolarSystem};
