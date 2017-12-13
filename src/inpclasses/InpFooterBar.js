
import {InputForm} from './InputForm.js'


class InpFooterBar extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         playerInfo: "object",
         handleShopClicked: "function"

      };

      this.validate(inputObject)

   }
}
export {InpFooterBar};
