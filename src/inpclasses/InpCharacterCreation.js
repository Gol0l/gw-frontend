import {InputForm} from './InputForm.js'


class InpCharacterCreation extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         suggestedName: "string",
         requestName: "function",
         submitFunction: "function"

      };

      this.validate(inputObject)



   }
}
export {InpCharacterCreation};
