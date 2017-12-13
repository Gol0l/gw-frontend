import {InputForm} from './InputForm.js'

class InpInventory extends InputForm {

   constructor(inputObject) {
      super(inputObject)

      this.template = {

         inventoryItems: "array",
         sizeOfRow: "number",
         sizeOfColumn: "number"

      };

      this.validate(inputObject)

   }
}
export {InpInventory};
