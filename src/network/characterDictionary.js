import {ModelCharacter} from '../modelclasses/Model.js';


class CharacterDictionary {

   constructor(network) {
      this.network = network;
      this.dict = {};
   }


   addChar(id, displayName, faction) {
      this.dict[id] = new ModelCharacter(id, displayName, faction);
   }

   getChar(id, callback) {
      if (id in this.dict) {
         return (this.dict[id]);
      }
      else {
         console.log("pulling char" + id);
         var promiseCharacter = this.pullChar(id);
         promiseCharacter.then(function(resolveData) {
            this.addChar(resolveData.id, resolveData.attributes.name, resolveData.attributes.faction);
            console.log("fetched character: " + id);
            console.log("now executing callback");
            callback();
         });
         return ("error");
      }
   }


   pullChar(id) {

      return (this.network.dataRequest("gwCharacter/" + id));
   }
}

export {CharacterDictionary}
