class Model {
   mapWidth
   mapHeight
   playerInfo => class ModelPlayerInfo {
      name
      faction
      readyForBattle
   }
   simSettings => class ModelSimSettings {
      mapScale
      systemScale
      baseStarSize
      basePlanetSize
      simSpeed
      fps
   }
   systemsList => Array class ModelSolarSystem {
      name
      top
      left
      neighbours Array
      CenterMass => class ModelCenterMass {
         radius
         brightness
         color
         coronaColor
      }
      planetList => Array class ModelPlanet {
         name
         sprite
         distance
         size
         spin
         faction
         mapInfo
         currentBattle => class ModelBattle {
            status
            timeToBattle
            battleParticipants
         }
      }
   }
}
