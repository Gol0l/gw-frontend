function handleHelloMessage(data) {
   this.playerInfo.isLoggedIn = true;
   if (data.characterId != null) {

      this.playerInfo.name = characterId;
      this.playerInfo.displayName = this.characterDict[characterId].name;
      this.playerInfo.faction = this.characterDict[characterId].faction;
      this.playerInfo.readyForBattle = true;
   }
}

function handlePlanetConquered(data) {
   const battle = this.battleDict.request(data.battleId)
   const planet = this.planetDict.request(data.planetId)
   planet.faction = data.attackingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}

function handlePlanetDefended(data) {
   const battle = this.battleDict.request(data.battleId)
   const planet = this.planetDict.request(data.planetId)
   planet.faction = data.defendingFaction
   battle.status = "idle"
   battle.battleParticipants = []
   battle.battleParticipantsUnique = []
}

function handlePlanetOwnerChanged(data) {
   const planet = this.planetDict.request(data.planetId)
   planet.faction = data.newOwner
}

function handlePlanetUnderAssault(data) {
   const battle = this.battleDict.request(data.battleId)
   battle.status = "lobby"
   battle.battleParticipants.push({ factionName: this.attackingFaction
                                                            players: []})
   battle.battleParticipants.push({ factionName: this.defendingFaction
                                                            players: []})
   battle.battleParticipantsUnique.push({ factionName: this.attackingFaction
                                                            players: []})
   battle.battleParticipantsUnique.push({ factionName: this.defendingFaction
                                                            players: []})
}

function handleSolarSystemLinked(data) {
   const solarSystemFrom = this.systemDict.request(data.solarSystemFrom)
   const solarSystemTo = this.systemDict.request(data.solarSystemTo)
   solarSystemFrom.neighbours.push(data.solarSystemTo)
   solarSystemTo.neighbours.push(data.solarSystemFrom)
}

function handleSolarSystemUnlinked(data) {
   const solarSystemFrom = this.systemDict.request(data.solarSystemFrom)
   const solarSystemTo = this.systemDict.request(data.solarSystemTo)

   var index = solarSystemTo.neighbours.indexOf(data.solarSystemFrom);
   if (index > -1) {
       solarSystemTo.neighbours.splice(index, 1);
   }

   var index = solarSystemFrom.neighbours.indexOf(data.solarSystemTo);
   if (index > -1) {
       solarSystemFrom.splice(index, 1);
   }
}

function handleBattleParticipantJoinedAssault(data) {
   const battle = this.battleDict[data.battleId];
   const character = this.characterDict[data.characterId];
   factionIndex = (battle.battleParticipantsUnique[0].factionName == character.faction) ? 0 : 1
   battle.battleParticipants[factionIndex].players.push(character.name)
   battle.battleParticipantsUnique[factionIndex].players.push(character.id)
}

function handleBattleParticipantLeftAssault(data) {
   const battle = this.battleDict[data.battleId];
   const character = this.characterDict[data.characterId];
   factionIndex = (battle.battleParticipants[0]Unique.factionName == character.faction) ? 0 : 1

   var index = battle.battleParticipantsUnique[factionIndex].players.indexOf(character.id);
   if (index > -1) {
       battle.battleParticipantsUnique[factionIndex].players.splice(index, 1);
       battle.battleParticipants[factionIndex].players.splice(index, 1);
   }

}

function handleBattleUpdateWaitingProgress(data) {
   const battle = this.battleDict[data.battleId];
   battle.waitingProgress = data.waitingProgress
   if (data.waitingProgress >= 1) {
      battle.status = "battle"
   }
}
