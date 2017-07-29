import {InputForm} from './InputForm.js'
import {InpSatelliteSettings} from './InpSatelliteSettings.js'
class InpSatellite extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         start: "arbitrary",
         radius: "number",
         size: "number",
         content: "object",
         settings: "object",
         spin: "number"

      };

      this.validate(inputObject)

      inputObject.settings = new InpSatelliteSettings(inputObject.settings)

      this.assign(inputObject)
   }
}
export {InpSatellite};
