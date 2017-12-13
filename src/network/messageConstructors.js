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

function shopCallback(model, network, transactions) {
   alert('top level! we did it!');
   console.log("transactions:");
   console.log(transactions);
}


var networkCallbacks = {buttonCallback: buttonCallback,
                        shopCallback: shopCallback};

export {networkCallbacks}

var uuidV4 = require('uuid/v4');
function createStartAssault(planetId) {
   const uuid = uuidV4();
   return ({action: "initiateAssault",
            data: {  requestId: uuid,
                     planetId: planetId}})
}

function createJoinAssault(battleId) {
   const uuid = uuidV4();
   return ({action: "joinAssault",
            data: {  requestId: uuid,
                     battleId: battleId}})
}


function createLeaveLobby(battleId) {
   console.log("creating leavelobby")
   const uuid = uuidV4();
   return ({action: "leaveAssault",
            data: {  requestId: uuid,
                     battleId: battleId}})
}
