
import {InputForm} from './InputForm.js'

class InpStatusBar extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         height: "number",
         distance: "number",
         contents: "array"

      };

      this.validate(inputObject)


   }
}
export {InpStatusBar};
