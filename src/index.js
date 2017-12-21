import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GalacticWar from './components/GalacticWar';
import {LoginBox} from './components/LoginBox'
import registerServiceWorker from './registerServiceWorker';
import {Model} from './modelclasses/Model.js';
import {handleFunctionDict} from './network/messageHandlers.js'
import {networkCallbacks} from './network/messageConstructors.js'
import {Connector} from './network/Connector.js'
//"https://api.faforever.com/oauth/token";

function startGalacticWar(model, network) {
   model.getForceAppUpdateFromApp = function(forceUpdateFunction) {
      model.forceAppUpdate = forceUpdateFunction;
   }
   ReactDOM.unmountComponentAtNode(document.getElementById('root'));
   ReactDOM.render(<GalacticWar  model = {model}   buttonCallback = {(planetId, buttonType) => networkCallbacks.buttonCallback(model, network, planetId, buttonType)}
                                                   shopCallback = {(transactions) => networkCallbacks.shopCallback(model, network, transactions)}/>, document.getElementById('root'));

   network.setupSocket(model, handleFunctionDict);

}

function setupModel(network, dataList) {
   var model = new Model();
   model.playerInfo.id = "userId";
   model.playerInfo.displayName = "aeon";
   model.playerInfo.faction = "aeon";
   model.playerInfo.hasCharacter = false;
   model.playerInfo.isInBattle = false;

   model.generateCharacterDict(dataList[0], network);
   model.incorporateBackendData(dataList[1], dataList[2], dataList[3]);
   model.generateDictionaries();

   startGalacticWar(model, network);

}

function init() {
   var network = new Connector("localhost:8080", "api.faforever.com/oauth/token", "postman", "postman", "");
   var continuation = () => prepareAndStartGalacticWar(network);
   ReactDOM.render(<LoginBox submitFunction = {(username, password) => network.loginUser(username, password, continuation)} />, document.getElementById('root'));
}

function prepareAndStartGalacticWar(network) {
   var promiseCharacters = network.dataRequest("gwCharacter", "", 1);
   var promiseSystems = network.dataRequest("solarSystem", "", 1);
   var promisePlanets = network.dataRequest("planet", "", 1);
   var promiseBattles = network.dataRequest("battle", "filter=status!=FINISHED", 1);

   Promise.all([promiseCharacters, promiseSystems, promisePlanets, promiseBattles]).then((returnDataList) => setupModel(network, returnDataList))

}

init();


registerServiceWorker();
