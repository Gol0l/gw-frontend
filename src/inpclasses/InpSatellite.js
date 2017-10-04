import {InputForm} from './InputForm.js'
import {InpSatelliteSettings} from './InpSatelliteSettings.js'
class InpSatellite extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         name: "string",
         displayName: "string",
         systemName: "string",
         start: "arbitrary",
         radius: "number",
         size: "number",
         content: "string",
         settings: "object",
         spin: "number",
         faction: "string",
         status: "string",
         isSelected: "boolean",
         funcPlanetOnClick: "function"

      };

      this.validate(inputObject)

      inputObject.settings = new InpSatelliteSettings(inputObject.settings)

      this.assign(inputObject)
   }
}
export {InpSatellite};
