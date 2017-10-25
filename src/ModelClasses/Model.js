
import {CharacterDictionary} from '../network/CharacterDictionary.js'

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
      this.messageHandlers = {}; //an object of handlers for the messages from the backend
      this.participantToCharacterIdDict = {};
   }

   addSystem(displayName, id, top, left) {
      this.systemsList.push(new ModelSolarSystem(displayName, id, top, left));
   }

   generateCharacterDict(dataCharacters, network) {
      console.log("generating model.characterDict")
      this.characterDict = new CharacterDictionary(network);
      for (var i = 0; i < dataCharacters.length; i++) {
         this.characterDict.addChar(dataCharacters[i].id, dataCharacters[i].attributes.name, dataCharacters[i].attributes.faction);
         for (var j = 0; j < dataCharacters[i].relationships.battleParticipantList.data.length; j++) {
            this.participantToCharacterIdDict[dataCharacters[i].relationships.battleParticipantList.data[j].id] = dataCharacters[i].id;
         }

      }
   }

   incorporateBackendData(dataSystems, dataPlanets, dataBattles) {
      this.systemList = [];
      var dataPlanetsDict = {}
      for (var i = 0; i < dataPlanets.length; i++) {
         dataPlanetsDict[dataPlanets[i].id] = dataPlanets[i];
      }
      var planetToBattleDict = {};
      for (var i = 0; i < dataBattles.length; i++) {
         planetToBattleDict[dataBattles[i].relationships.planet.data.id] = dataBattles[i];
      }


      for (var i = 0; i < dataSystems.length; i++) {
         var sys = dataSystems[i];
         this.addSystem(   (sys.attributes.name == null) ? "no name" : sys.attributes.name,
                           sys.id,
                           sys.attributes.y * this.simSettings.systemPositionScale,
                           sys.attributes.x * this.simSettings.systemPositionScale);

         for (var j = 0; j < sys.relationships.connectedSystems.data.length; j++) {
            this.systemsList[i].neighbours.push(sys.relationships.connectedSystems.data[j].id);
         }

         for (var j = 0; j < sys.relationships.planets.data.length; j++) {

            var currentPlanetId = sys.relationships.planets.data[j].id;

            this.systemsList[i].addPlanet(   (dataPlanetsDict[currentPlanetId].attributes.name == null) ? "no name" : dataPlanetsDict[currentPlanetId].attributes.name,
                                             dataPlanetsDict[currentPlanetId].id,
                                             dataPlanetsDict[currentPlanetId].attributes.currentOwner,
                                             {mapName: "Seton's Clutch", mapImg: "SetonsClutch.png", mapSize: 20, maxPlayers: 8},
                                             dataPlanetsDict[currentPlanetId].relationships.map.data.id,
                                             'planetSprites1.png');

            var currentPlanet = this.systemsList[i].planetList[this.systemsList[i].planetList.length - 1];
            if (currentPlanetId in planetToBattleDict) {

               currentPlanet.currentBattle.id = planetToBattleDict[currentPlanetId].id;
               currentPlanet.currentBattle.waitingProgress = planetToBattleDict[currentPlanetId].attributes.waitingProgress;

               if (planetToBattleDict[currentPlanetId].attributes.status == "INITIATED") {
                  currentPlanet.currentBattle.status = "lobby";
               }
               else if (planetToBattleDict[currentPlanetId].attributes.status == "FINISHED") {
                  console.log("there shouldnt be any finished battes, Ill display battle");
                  currentPlanet.currentBattle.status = "battle";
               }
               currentPlanet.currentBattle.battleParticipants.push({ factionName: planetToBattleDict[currentPlanetId].attributes.defendingFaction,
                                                                     players: []});
               currentPlanet.currentBattle.battleParticipants.push({ factionName: planetToBattleDict[currentPlanetId].attributes.attackingFaction,
                                                                     players: []});
               currentPlanet.currentBattle.battleParticipantsUnique.push({ factionName: planetToBattleDict[currentPlanetId].attributes.defendingFaction,
                                                                     players: []});
               currentPlanet.currentBattle.battleParticipantsUnique.push({ factionName: planetToBattleDict[currentPlanetId].attributes.attackingFaction,
                                                                     players: []});

               var participantList = planetToBattleDict[currentPlanetId].relationships.participants.data



               for (var k = 0; k < participantList.length; k++) {
                  var currentCharId = this.participantToCharacterIdDict[participantList[k].id];

                  if (!(participantList[k].id in this.participantToCharacterIdDict)) {
                     console.log("error: couldnt find character corresponding to one this battles' participants")
                  }
                  var currentCharacter = this.characterDict.getChar(currentCharId, () => this.incorporateBackendData(dataSystems, dataPlanets, dataBattles));

                  for (var l = 0; l < 2; l++) {
                     if (currentPlanet.currentBattle.battleParticipantsUnique[l].factionName == currentCharacter.faction) {

                        currentPlanet.currentBattle.battleParticipantsUnique[l].players.push(currentCharacter.id)
                        currentPlanet.currentBattle.battleParticipants[l].players.push(currentCharacter.displayName)
                     }
                  }
               }
               console.log(currentPlanet.currentBattle);
            }
         }
      }
      //this information will NOT be updated through the websocket and is OUTDATED soon after the initialization
      this.participantToCharacterIdDict = null
   }

   generateDictionaries() {
      this.systemDict = {}
      this.planetDict = {}
      this.battleDict = {}
      for (var i = 0; i < this.systemsList.length; i++) {
         this.systemDict[this.systemsList[i].id] = this.systemsList[i];
         for (var j = 0; j < this.systemsList[i].planetList.length; j++) {
            this.planetDict[this.systemsList[i].planetList[j].id] = this.systemsList[i].planetList[j];
            this.battleDict[this.systemsList[i].planetList[j].currentBattle.id] = this.systemsList[i].planetList[j].currentBattle;
         }
      }
   }
}

class ModelPlayerInfo {
   constructor() {

      this.id = ""; //a UNIQUE identifying string
      this.displayName = ""; //name that a user sees
      this.suggestedDisplayName = "Bernd";
      this.faction = ""; //player faction
      this.isInBattle = false; //a variable that sums up all player related reasons why he might or might not be able to join a lobby
      this.isLoggedIn = false;
      this.hasCharacter = false;

   }
}

class ModelCharacter {
   constructor(id, displayName, faction) {
      this.id = id;
      this.displayName = displayName;
      this.faction = faction;
   }
}

class ModelSimSettings {
   constructor() {

      this.mapScale = 1; //relevant for zoom beheaviour
      this.systemPositionScale = 10; //the scale of the systems coordinate system
      this.systemScale = 2; //the scale of the systems
      this.baseStarSize = 1.5; //factor to scale all star radii
      this.basePlanetSize = 0.35; //factor to scale all sprite radii
      this.simSpeed = 1; //the speed of planet movement
      this.fps = 30; //the fps in planetmovement
   }
}

class ModelSolarSystem {
   constructor(displayName, id, top, left) {
      this.displayName = displayName; //name that the player sees
      this.id = id; //a UNIQUE identifying string
      this.top = top;
      this.left = left;

      this.gravPar = 1; //simply a mix of the gravitational constant and the stars mass in physical terms, increasing it just makes planets rotate faster, not really relevant
      this.centerMass = new ModelCenterMass(); //the component that renders the actual star
      this.neighbours = []; //from: an array of the stars ids
      this.planetList = []; //form: an array od ModelPlanet objects

   }

   addPlanet(displayName, id, faction, mapInfo, mapId, sprite) {
      this.planetList.push(new ModelPlanet(displayName, id, faction, mapInfo, mapId, sprite));
   }
}

class ModelCenterMass {
   constructor() {

      this.radius = Math.random() + 0.7; //the radius of the circle
      this.brightness = 2 + Math.random() * 4; //the size of the shadow
      this.color = "white";
      this.coronaColor = "lightBlue";
   }
}

class ModelPlanet {
   constructor(displayName, id, faction, mapInfo, mapId, sprite) {
      this.displayName = displayName; //name that the player sees
      this.id = id; //a UNIQUE identifying string
      this.faction = faction; //the planets current governing faction
      this.mapInfo = mapInfo; //form: {mapImg: mapname.pmg, mapName: mapname, mapSize: 20, maxPlayers: 8}
      this.mapId = mapId;
      this.sprite = sprite; //form: planetspritename.png

      this.distance = (Math.random() * 8) + 2; //distance from the star
      this.size = Math.random() + 1; //size of the sprite
      this.spin = (Math.random()*2-1) * 2 / 10; //speed of rotation of the sprite
      this.currentBattle = new ModelBattle()
   }
}

class ModelBattle {
   constructor() {

      this.id = "nobattle"; //a UNIQUE identifying string
      this.status = "idle"; //"idle", "lobby", and "battle" for nothing, an open lobby and a battle currently going on
      this.waitingProgress = 0; //either the current time to battle that gets updated regularly to be displayed in the lobby or an initial time that the client counts down himself from
      this.battleParticipantsUnique = []; //form: [{factionName: string of name, players: array of ids}, {factionName: string of name, players: array of ids}]
      this.battleParticipants = []; //form: [{factionName: string of name, players: array of names}, {factionName: string of name, players: array of names}]
   }
}

export {Model};
export {ModelCharacter};
