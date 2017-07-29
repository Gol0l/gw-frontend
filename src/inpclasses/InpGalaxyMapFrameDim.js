import {InputForm} from './InputForm.js'

class InpGalaxyMapFrameDim extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         leftSize: "number",
         topSize: "number",
         rightSize: "number",
         bottomSize: "number"
      };

      this.validate(inputObject)


   }
}
export {InpGalaxyMapFrameDim};
