class CharacterDictionary {

   constructor(network) {
      this.network = network;
      this.dict = {};
   }


   setChar(id, name, faction) {
      this.dict[id] = {id: id, name: name, faction: faction};
   }

   getChar(id) {
      if (id in this.dict) {
         return (this.dict[id]);
      }
      else {
         console.log("pulling char" + id);
         this.pullChar(id);
         return this.getChar(id);
      }
   }

   pullChar(id) {
      var gwCharacter = this.network.dataRequest("gwCharacter/" + id);
      this.dict[id] = { id: gwCharacter.id,
                        name: gwCharacter.attributes.name,
                        faction: gwCharacter.attributes.faction};
   }
}

export {CharacterDictionary}
