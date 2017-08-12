import {InputForm} from './InputForm.js'


class InpMapLine extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         points: "array",
         type: "string",
         identifier: "number"

      };

      this.validate(inputObject)



   }
}
export {InpMapLine};
