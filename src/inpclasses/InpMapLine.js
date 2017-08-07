import {InputForm} from './InputForm.js'


class InpMapLine extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         points: "array"

      };

      this.validate(inputObject)



   }
}
export {InpMapLine};
