function handleHelloMessage(model, data) {
   console.log("HANDLEHELLOMESSAGE" + model);
   if (data.characterId != null) {
      const character = model.characterDict.getChar(data.characterId, () => handleHelloMessage(model, data));
      if (character != "error") {
         console.log("currentbattleid" + data.currentBattleId)
         model.playerInfo.isLoggedIn = true;
         model.playerInfo.id = character.id;
         model.playerInfo.displayName = character.displayName;
         model.playerInfo.faction = character.faction;
         if (data.currentBattleId != null) {
            model.playerInfo.isInBattle = true;
         }
         else {
            model.playerInfo.isInBattle = false;
         }
      }
   }

   model.forceAppUpdate();
}
export {handleHelloMessage}

function handlePlanetConquered(model, data) {
   const battle = model.battleDict[data.battleId]
   const planet = model.planetDict[data.planetId]
   planet.faction = data.attackingFaction
   battle.id = "nobattle";
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []

   model.forceAppUpdate();
}
export {handlePlanetConquered}

function handlePlanetDefended(model, data) {
   const battle = model.battleDict[data.battleId]
   const planet = model.planetDict[data.planetId]
   planet.faction = data.defendingFaction
   battle.id = "nobattle";
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []

   model.forceAppUpdate();
}
export {handlePlanetDefended}

function handlePlanetOwnerChanged(model, data) {
   const planet = model.planetDict[data.planetId]
   planet.faction = data.newOwner;

   model.forceAppUpdate();
}
export {handlePlanetOwnerChanged}

function handlePlanetUnderAssault(model, data) {
   model.battleDict[data.battleId] = model.planetDict[data.planetId].currentBattle;

   const battle = model.battleDict[data.battleId]
   battle.status = "lobby"
   battle.battleParticipants.push({ factionName: data.defendingFaction,
                                    players: []})
   battle.battleParticipants.push({ factionName: data.attackingFaction,
                                    players: []})
   battle.battleParticipantsUnique.push({ factionName: data.defendingFaction,
                                          players: []})
   battle.battleParticipantsUnique.push({ factionName: data.attackingFaction,
                                          players: []})

   model.forceAppUpdate();
}

export {handlePlanetUnderAssault}

function handleSolarSystemLinked(model, data) {
   const solarSystemFrom = model.systemDict[data.solarSystemFrom]
   const solarSystemTo = model.systemDict[data.solarSystemTo]
   solarSystemFrom.neighbours.push(data.solarSystemTo)
   solarSystemTo.neighbours.push(data.solarSystemFrom)

   model.forceAppUpdate();
}
export {handleSolarSystemLinked}

function handleSolarSystemUnlinked(model, data) {
   const solarSystemFrom = model.systemDict[data.solarSystemFrom]
   const solarSystemTo = model.systemDict[data.solarSystemTo]

   var index = solarSystemTo.neighbours.indexOf(data.solarSystemFrom);
   if (index > -1) {
       solarSystemTo.neighbours.splice(index, 1);
   }

   var index = solarSystemFrom.neighbours.indexOf(data.solarSystemTo);
   if (index > -1) {
       solarSystemFrom.splice(index, 1);
   }

   model.forceAppUpdate();
}
export {handleSolarSystemUnlinked}

function handleBattleParticipantJoinedAssault(model, data) {
   const battle = model.battleDict[data.battleId];
   const character = model.characterDict.getChar(data.characterId, () => handleBattleParticipantJoinedAssault(model, data));
   if (character != "error") {
      var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1
      battle.battleParticipants[factionIndex].players.push(character.displayName)
      battle.battleParticipantsUnique[factionIndex].players.push(character.id)

      if (model.playerInfo.id == character.id) {
         model.playerInfo.isInBattle = true;
      }
   }

   model.forceAppUpdate();
}
export {handleBattleParticipantJoinedAssault}

function handleBattleParticipantLeftAssault(model, data) {
   const battle = model.battleDict[data.battleId];
   const character = model.characterDict.getChar(data.characterId, () => handleBattleParticipantLeftAssault(model, data));
   if (character != "error") {
      var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1

      var index = battle.battleParticipantsUnique[factionIndex].players.indexOf(character.id);
      if (index > -1) {
          battle.battleParticipantsUnique[factionIndex].players.splice(index, 1);
          battle.battleParticipants[factionIndex].players.splice(index, 1);
      }

      if (model.playerInfo.id == character.id) {
         model.playerInfo.isInBattle = false;
      }
   }

   model.forceAppUpdate();
}
export {handleBattleParticipantLeftAssault}

function handleBattleUpdateWaitingProgress(model, data) {
   const battle = model.battleDict[data.battleId];
   battle.waitingProgress = data.waitingProgress
   if (data.waitingProgress >= 1) {
      battle.status = "battle"
   }

   model.forceAppUpdate();
}

export{handleBattleUpdateWaitingProgress}

var handleFunctionDict = { "battle.waiting_progress": handleBattleUpdateWaitingProgress,
                           "planet.conquered": handlePlanetConquered,
                           "planet.defended": handlePlanetDefended,
                           "battle.participant_joined": handleBattleParticipantJoinedAssault,
                           "battle.participant_left": handleBattleParticipantLeftAssault,
                           "universe.planet_owner_changed": handlePlanetOwnerChanged,
                           "planet.attacked": handlePlanetUnderAssault,
                           "universe.solar_systems_linked": handleSolarSystemLinked,
                           "universe.solar_systems_unlinked": handleSolarSystemUnlinked,
                           "user.hello": handleHelloMessage}

export {handleFunctionDict}
