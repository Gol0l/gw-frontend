function buttonCallback(model, network, planetId, buttonType) {
   switch (buttonType) {
      case "startAttack":
         network.sendMessage(createStartAssault(planetId));
         break;
      case "joinAttack":
         network.sendMessage(createJoinAssault(model.planetDict[planetId].currentBattle.id));
         break;
      case "joinDefense":
         network.sendMessage(createJoinAssault(model.planetDict[planetId].currentBattle.id));
         break;
      case "leaveLobby":
         network.sendMessage(createLeaveLobby(model.planetDict[planetId].currentBattle.id));
         break;
      default:
         console.log("error while sending message, buttonType: " + buttonType)
         break;
   }
}

export {buttonCallback}

function createStartAssault(planetId) {
   const uuid = require('uuid/v4');
   return ({action: "initiateAssault",
            data: {  requestId: uuid,
                     planetId: planetId}})
}

function createJoinAssault(battleId) {
   const uuid = require('uuid/v4');
   return ({action: "joinAssault",
            data: {  requestId: uuid,
                     battleId: battleId}})
}


function createLeaveLobby(battleId) {
   const uuid = require('uuid/v4');
   return ({action: "leaveAssault",
            data: {  requestId: uuid,
                     battleId: battleId}})
}
