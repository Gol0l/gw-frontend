import {InputForm} from './InputForm.js'

class InpInventory extends InputForm {

   constructor(inputObject) {
      super(inputObject)

      this.template = {

         shopItems: "array",
         playerInventory: "object",
         sizeOfRow: "number",
         sizeOfColumn: "number"

      };

      this.validate(inputObject)

   }
}
export {InpInventory};
