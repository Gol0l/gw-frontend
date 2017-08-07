
import {InputForm} from './InputForm.js'

class InpDragBox extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         left: "arbitrary",
         top: "arbitrary",
         width: "arbitrary",
         height: "arbitrary",
         minLeft: "arbitrary",
         minTop: "arbitrary",
         maxLeft: "arbitrary",
         maxTop: "arbitrary",
         content: "object"

      };

      this.validate(inputObject)


   }
}
export {InpDragBox};
