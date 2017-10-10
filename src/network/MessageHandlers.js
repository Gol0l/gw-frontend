function handleHelloMessage(model, data) {
   model.playerInfo.isLoggedIn = true;
   if (data.characterId != null) {
      const character = model.characterDict.getChar(data.characterId, () => handleHelloMessage(model, data));

      model.playerInfo.id = character.id;
      model.playerInfo.displayName = character.displayName;
      model.playerInfo.faction = character.faction;
      model.playerInfo.readyForBattle = true;
   }
}
export {handleHelloMessage}

function handlePlanetConquered(model, data) {
   const battle = model.battleDict[data.battleId]
   const planet = model.planetDict[data.planetId]
   planet.faction = data.attackingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}
export {handlePlanetConquered}

function handlePlanetDefended(model, data) {
   const battle = model.battleDict[data.battleId]
   const planet = model.planetDict[data.planetId]
   planet.faction = data.defendingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}
export {handlePlanetDefended}

function handlePlanetOwnerChanged(model, data) {
   const planet = model.planetDict[data.planetId]
   planet.faction = data.newOwner
}
export {handlePlanetOwnerChanged}

function handlePlanetUnderAssault(model, data) {
   const battle = model.battleDict[data.battleId]
   battle.status = "lobby"
   battle.battleParticipants.push({ factionName: model.defendingFaction,
                                    players: []})
   battle.battleParticipants.push({ factionName: model.attackingFaction,
                                    players: []})
   battle.battleParticipantsUnique.push({ factionName: model.defendingFaction,
                                          players: []})
   battle.battleParticipantsUnique.push({ factionName: model.attackingFaction,
                                          players: []})
}
export {handlePlanetUnderAssault}

function handleSolarSystemLinked(model, data) {
   const solarSystemFrom = model.systemDict[data.solarSystemFrom]
   const solarSystemTo = model.systemDict[data.solarSystemTo]
   solarSystemFrom.neighbours.push(data.solarSystemTo)
   solarSystemTo.neighbours.push(data.solarSystemFrom)
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
}
export {handleSolarSystemUnlinked}

function handleBattleParticipantJoinedAssault(model, data) {
   const battle = model.battleDict[data.battleId];
   const character = model.characterDict.getChar(data.characterId, () => handleBattleParticipantJoinedAssault(model, data));
   var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1
   battle.battleParticipants[factionIndex].players.push(character.displayName)
   battle.battleParticipantsUnique[factionIndex].players.push(character.id)
}
export {handleBattleParticipantJoinedAssault}

function handleBattleParticipantLeftAssault(model, data) {
   const battle = model.battleDict[data.battleId];
   const character = model.characterDict.getChar(data.characterId, () => handleBattleParticipantJoinedAssault(model, data));
   var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1

   var index = battle.battleParticipantsUnique[factionIndex].players.indexOf(character.id);
   if (index > -1) {
       battle.battleParticipantsUnique[factionIndex].players.splice(index, 1);
       battle.battleParticipants[factionIndex].players.splice(index, 1);
   }

}
export {handleBattleParticipantLeftAssault}

function handleBattleUpdateWaitingProgress(model, data) {
   const battle = model.battleDict[data.battleId];
   battle.waitingProgress = data.waitingProgress
   if (data.waitingProgress >= 1) {
      battle.status = "battle"
   }
}

export{handleBattleUpdateWaitingProgress}

var handleFunctionDict = { handleBattleUpdateWaitingProgress: handleBattleUpdateWaitingProgress,
                           handlePlanetConquered: handlePlanetConquered,
                           handlePlanetDefended: handlePlanetDefended,
                           handleBattleParticipantJoinedAssault: handleBattleParticipantJoinedAssault,
                           handleBattleParticipantLeftAssault: handleBattleParticipantLeftAssault,
                           handlePlanetOwnerChanged: handlePlanetOwnerChanged,
                           handlePlanetUnderAssault: handlePlanetUnderAssault,
                           handleSolarSystemLinked: handleSolarSystemLinked,
                           handleSolarSystemUnlinked: handleSolarSystemUnlinked,
                           handleHelloMessage: handleHelloMessage}

export {handleFunctionDict}
