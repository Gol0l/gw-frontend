
import {InputForm} from './InputForm.js'

class InpSolarSystemCenterMass extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         radius: "number",
         color: "string",
         coronaColor: "string",
         brightness: "number"

      };

      this.validate(inputObject)



   }
}
export {InpSolarSystemCenterMass};
