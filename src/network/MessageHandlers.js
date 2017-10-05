function handleHelloMessage(data) {
   this.playerInfo.isLoggedIn = true;
   if (data.characterId != null) {

      this.playerInfo.id = data.characterId;
      this.playerInfo.displayName = this.characterDict.getChar(data.characterId).name;
      this.playerInfo.faction = this.characterDict.getChar(data.characterId).faction;
      this.playerInfo.readyForBattle = true;
   }
}
export {handleHelloMessage}

function handlePlanetConquered(data) {
   const battle = this.battleDict[data.battleId]
   const planet = this.planetDict[data.planetId]
   planet.faction = data.attackingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}
export {handlePlanetConquered}

function handlePlanetDefended(data) {
   const battle = this.battleDict[data.battleId]
   const planet = this.planetDict[data.planetId]
   planet.faction = data.defendingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}
export {handlePlanetDefended}

function handlePlanetOwnerChanged(data) {
   const planet = this.planetDict[data.planetId]
   planet.faction = data.newOwner
}
export {handlePlanetOwnerChanged}

function handlePlanetUnderAssault(data) {
   const battle = this.battleDict[data.battleId]
   battle.status = "lobby"
   battle.battleParticipants.push({ factionName: this.defendingFaction,
                                    players: []})
   battle.battleParticipants.push({ factionName: this.attackingFaction,
                                    players: []})
   battle.battleParticipantsUnique.push({ factionName: this.defendingFaction,
                                          players: []})
   battle.battleParticipantsUnique.push({ factionName: this.attackingFaction,
                                          players: []})
}
export {handlePlanetUnderAssault}

function handleSolarSystemLinked(data) {
   const solarSystemFrom = this.systemDict[data.solarSystemFrom]
   const solarSystemTo = this.systemDict[data.solarSystemTo]
   solarSystemFrom.neighbours.push(data.solarSystemTo)
   solarSystemTo.neighbours.push(data.solarSystemFrom)
}
export {handleSolarSystemLinked}

function handleSolarSystemUnlinked(data) {
   const solarSystemFrom = this.systemDict[data.solarSystemFrom]
   const solarSystemTo = this.systemDict[data.solarSystemTo]

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

function handleBattleParticipantJoinedAssault(data) {
   const battle = this.battleDict[data.battleId];
   const character = this.characterDict.getChar(data.characterId);
   var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1
   battle.battleParticipants[factionIndex].players.push(character.name)
   battle.battleParticipantsUnique[factionIndex].players.push(character.id)
}
export {handleBattleParticipantJoinedAssault}

function handleBattleParticipantLeftAssault(data) {
   const battle = this.battleDict[data.battleId];
   const character = this.characterDict.getChar(data.characterId);
   var factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1

   var index = battle.battleParticipantsUnique[factionIndex].players.indexOf(character.id);
   if (index > -1) {
       battle.battleParticipantsUnique[factionIndex].players.splice(index, 1);
       battle.battleParticipants[factionIndex].players.splice(index, 1);
   }

}
export {handleBattleParticipantLeftAssault}

function handleBattleUpdateWaitingProgress(data) {
   const battle = this.battleDict[data.battleId];
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
