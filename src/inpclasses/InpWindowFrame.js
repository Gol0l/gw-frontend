import {InputForm} from './InputForm.js'


class InpWindowFrame extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         left: "number",
         top: "number",
         width: "number",
         height: "number",
         leftSize: "number",
         topSize: "number",
         rightSize: "number",
         bottomSize: "number",
         color: "string"

      };

      this.validate(inputObject)


   }
}
export {InpWindowFrame};
