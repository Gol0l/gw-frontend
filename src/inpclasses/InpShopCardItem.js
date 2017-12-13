import {InputForm} from './InputForm.js'


class InpShopCardItem extends InputForm {

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
export {InpShopCardItem};
