import {InputForm} from './InputForm.js'


class InpInventoryCardItem extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         image: "string",
         name: "string",
         itemId: "string",
         price: "number"

      };

      this.validate(inputObject)


   }
}
export {InpInventoryCardItem};
