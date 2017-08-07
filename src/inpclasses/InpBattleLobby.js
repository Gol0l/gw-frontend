import {InputForm} from './InputForm.js'


class InpBattleLobby extends InputForm {

   constructor(inputObject) {
      super(inputObject);

      this.template = {

         battleParticipants: "array",
         timeToBattle: "number",
         status: "string",
         maxPlayers: "number"

      };

      this.validate(inputObject)

   }
}
export {InpBattleLobby};
