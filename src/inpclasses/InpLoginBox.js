import {InputForm} from './InputForm.js'


class InpLoginBox extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         submitFunction: "function"

      };

      this.validate(inputObject)



   }
}
export {InpLoginBox};
