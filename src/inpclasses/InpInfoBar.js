
import {InputForm} from './InputForm.js'


class InpInfoBar extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         planetFaction: "string",
         planetName: "string",
         width: "number",
         height: "number",
         mapInfo: "object",
         battleInfo: "object",
         buttonType: "string",
         buttonFunction: "function"

      };

      this.validate(inputObject)

   }
}
export {InpInfoBar};
