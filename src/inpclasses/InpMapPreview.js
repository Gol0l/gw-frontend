
import {InputForm} from './InputForm.js'


class InpMapPreview extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         mapName: "string",
         mapSize: "number",
         mapImg: "string",
         maxPlayers: "number"

      };

      this.validate(inputObject)

   }
}
export {InpMapPreview};
