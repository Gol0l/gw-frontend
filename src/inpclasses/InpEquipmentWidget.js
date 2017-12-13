import {InputForm} from './InputForm.js'

class InpEquipmentWidget extends InputForm {

   constructor(inputObject) {
      super(inputObject)

      this.template = {

         shopItems: "array",
         playerInfo: "object",
         shopProcessTransactions: "function",

      };

      this.validate(inputObject)

   }
}
export {InpEquipmentWidget};
