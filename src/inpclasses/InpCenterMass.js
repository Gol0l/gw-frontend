
import {InputForm} from './InputForm.js'

class InpCenterMass extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         width: "number",
         height: "number",
         brightness: "number",
         color: "string",
         coronaColor: "string"

      };

      this.validate(inputObject)


   }
}
export {InpCenterMass};
