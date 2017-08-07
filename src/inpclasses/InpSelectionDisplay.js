import {InputForm} from './InputForm.js'


class InpSelectionDisplay extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         width: "number",
         height: "number",
         selection: "object",
         systemsList: "array",
         playerInfo: "object",
         buttonTypeToFunction: "object"

      };

      this.validate(inputObject)

   }
}
export {InpSelectionDisplay};
