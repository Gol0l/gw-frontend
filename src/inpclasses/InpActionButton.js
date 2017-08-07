
import {InputForm} from './InputForm.js'


class InpActionButton extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         buttonType: "string",
         buttonFunction: "function"

      };

      this.validate(inputObject)

   }
}
export {InpActionButton};
