import {InputForm} from './InputForm.js'

class InpSolarSystemSimSettings extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         scale: "number",
         fps: "number",
         simSpeed: "number",
         baseStarSize: "number",
         basePlanetSize: "number"

      };

      this.validate(inputObject)



   }
}
export {InpSolarSystemSimSettings};
