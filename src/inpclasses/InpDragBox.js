
import {InputForm} from './InputForm.js'

class InpDragBox extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         left: "number",
         top: "number",
         minLeft: "arbitrary",
         minTop: "arbitrary",
         maxLeft: "arbitrary",
         maxTop: "arbitrary",
         returnShiftedPosition: "function",
         content: "object"

      };

      this.validate(inputObject)


   }
}
export {InpDragBox};
