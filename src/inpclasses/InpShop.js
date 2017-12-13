import {InputForm} from './InputForm.js'

class InpShop extends InputForm {

   constructor(inputObject) {
      super(inputObject)

      this.template = {

         shopItems: "array",
         sizeOfRow: "number",
         sizeOfColumn: "number",
         returnTransactions: "function",
         userBalance: "number"

      };

      this.validate(inputObject)

   }
}
export {InpShop};
