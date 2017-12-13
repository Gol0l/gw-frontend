import {InputForm} from './InputForm.js'
import {InpShopCardItem} from './InpShopCardItem';

class InpShopCard extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         item: "object",
         status: "number",
         changeCart: "function"

      };

      this.validate(inputObject)

      inputObject.item = new InpShopCardItem(inputObject.item);


   }
}
export {InpShopCard};
