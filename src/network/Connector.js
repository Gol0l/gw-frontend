import {startGalacticWar} from '../index.js'

class Connector {

   constructor(domain) {
      this.domain = domain;
      this.model = {};
   }


   dataRequest(entity) {
      var url = "http://" + this.domain + "/data/" + entity;
      console.log(url);

      var requestPromise = new Promise(function(resolve, reject) {
         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function(response) {
            if (this.readyState == 4 && this.status == 200) {
               console.log("xhttp done" + entity);
               resolve(JSON.parse(xhttp.responseText).data);

            } else if (this.readyState == 4) {
               console.log("failed xhttp");
               reject("dataRequest failed");
            }
         };
         xhttp.open("GET", url);
         xhttp.send();
      });

      return (requestPromise)


   }

   setupSocket(user_token, model, handlers) {
      this.model = model;
      var url = "ws://" + this.domain + "/websocket?accessToken=" + user_token;
      this.socket = new WebSocket(url);
      this.socket.onmessage = function (event) {
         var data = JSON.parse(event.data);
         var handler = handlers[data.action];
         if (handler) {
            console.log("message received: " + data.action);
            handler(model, data.data);
         } else {
            console.log("No handler registered for this message: " + data.action);
            console.log(data);
         }


      }
      this.socket.onopen = function (event) {
         console.log("onOpen");
      };

      this.socket.onclose = function (event) {
         console.log("onClose");
      };
   }

   sendMessage(data) {
      this.socket.send(JSON.stringify(data));
   }


}

export {Connector}
