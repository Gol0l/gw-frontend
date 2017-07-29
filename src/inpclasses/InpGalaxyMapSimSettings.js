import {InputForm} from './InputForm.js'

class InpGalaxyMapSimSettings extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         mapScale: "number",
         systemScale: "number",
         simSpeed: "number",
         fps: "number",
         baseStarSize: "number",
         basePlanetSize: "number"
      };

      this.validate(inputObject)


   }
}
export {InpGalaxyMapSimSettings};
