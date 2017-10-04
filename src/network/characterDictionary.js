class characterDictionary {

   constructor(entity, network) {
      this.network = network;
      this.dict = {};
   }


   get(name) {

      if (name in this.dict) {
         return (this.dict[name]);
      }
      else {
         add(name);
      }


   }

   add(name) {
      gwCharacter = this.network.request(entity, name);
      this.dict[name] = {  id: gwCharacter.id,
                           name: gwCharacter.attributes.name,
                           faction: gwCharacter.attributes.faction};
   }
}
