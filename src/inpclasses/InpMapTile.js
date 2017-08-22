import {InputForm} from './InputForm.js'


class InpMapTile extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {
         points: "array",
         color: "string"

      };

      this.validate(inputObject)



   }
}
export {InpMapTile};
