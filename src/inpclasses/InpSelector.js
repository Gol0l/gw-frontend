
import {InputForm} from './InputForm.js'

class InpSelector extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         width: "number",
         height: "number"

      };

      this.validate(inputObject)


   }
}
export {InpSelector};
