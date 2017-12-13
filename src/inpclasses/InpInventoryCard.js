import {InputForm} from './InputForm.js'
import {InpInventoryCardItem} from './InpInventoryCardItem';

class InpInventoryCard extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         item: "object"

      };

      this.validate(inputObject)

      inputObject.item = new InpInventoryCardItem(inputObject.item);


   }
}
export {InpInventoryCard};
