
//only properties which are necessary to be clear from the beginning are given in the constructor
//many properties just have defaults
//properties that arent necessary for the core gameplay and not yet exist in the database like planet size and spin are currently just random

class Model {
   constructor(mapWidth, mapHeight) {
      this.mapWidth = mapWidth; //Width and Height of the map on which the stars' coordinates lie
      this.mapHeight = mapHeight;

      this.playerInfo = new ModelPlayerInfo();
      this.simSettings = new ModelSimSettings();
      this.systemsList = []; //form: an array of ModelSolarSystem objects
   }

   addSystem(displayName, name, top, left) {
      this.systemsList.push(new ModelSolarSystem(displayName, name, top, left));
   }
}

class ModelPlayerInfo {
   constructor() {

      this.name = ""; //a UNIQUE identifying string
      this.displayName = ""; //name that a user sees
      this.faction = ""; //player faction
      this.readyForBattle = false; //a variable that sums up all player related reasons why he might or might not be able to join a lobby
      this.isLoggedIn = false;
   }
}

class ModelSimSettings {
   constructor() {

      this.mapScale = 3; //relevant for zoom beheaviour
      this.systemScale = 7; //the scale of the systems
      this.baseStarSize = 1.6; //factor to scale all star radii
      this.basePlanetSize = 0.35; //factor to scale all sprite radii
      this.simSpeed = 1; //the speed of planet movement
      this.fps = 30; //the fps in planetmovement
   }
}

class ModelSolarSystem {
   constructor(displayName, name, top, left) {
      this.displayName = displayName; //name that the player sees
      this.name = name; //a UNIQUE identifying string
      this.top = top;
      this.left = left;

      this.gravPar = 1; //simply a mix of the gravitational constant and the stars mass in physical terms, increasing it just makes planets rotate faster, not really relevant
      this.centerMass = new ModelCenterMass(); //the component that renders the actual star
      this.neighbours = []; //from: an array of the stars names
      this.planetList = []; //form: an array od ModelPlanet objects

   }

   addPlanet(displayName, name, faction, mapInfo, sprite) {
      this.planetList.push(new ModelPlanet(displayName, name, faction, mapInfo, sprite));
   }
}

class ModelCenterMass {
   constructor() {

      this.radius = Math.random() + 0.7; //the radius of the circle
      this.brightness = 1 + Math.random() * 6; //the size of the shadow
      this.color = "white";
      this.coronaColor = "lightBlue";
   }
}

class ModelPlanet {
   constructor(displayName, name, faction, mapInfo, sprite) {
      this.displayName = name; //name that the player sees
      this.name = name; //a UNIQUE identifying string
      this.faction = faction; //the planets current governing faction
      this.mapInfo = mapInfo; //form: {mapImg: mapname.pmg, mapName: mapname, mapSize: 20, maxPlayers: 8}
      this.sprite = sprite; //form: planetspritename.png

      this.distance = Math.floor((Math.random() * 8) + 2); //distance from the star
      this.size = Math.random() + 1; //size of the sprite
      this.spin = (Math.random()*2-1) * 2 / 10; //speed of rotation of the sprite
      this.currentBattle = new ModelBattle()
   }
}

class ModelBattle {
   constructor() {

      this.status = "idle"; //"idle", "lobby", and "battle" for nothing, an open lobby and a battle currently going on
      this.timeToBattle = 0; //either the current time to battle that gets updated regularly to be displayed in the lobby or an initial time that the client counts down himself from
      this.battleParticipants = []; //form: [{factionName: string of name, players: array of names}, {factionName: string of name, players: array of names}]
   }
}

export {Model};
