import {InputForm} from './InputForm.js'

class InpEquipmentWidget extends InputForm {

   constructor(inputObject) {
      super(inputObject)

      this.template = {

         shopItems: "array",
         inventoryItems: "array",
         shopProcessTransactions: "function",
         userBalance: "number"

      };

      this.validate(inputObject)

   }
}
export {InpEquipmentWidget};
