
import {InputForm} from './InputForm.js'

class InpSelector extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         width: "number",
         height: "number",
         isOpened: "boolean"

      };

      this.validate(inputObject)


   }
}
export {InpSelector};
