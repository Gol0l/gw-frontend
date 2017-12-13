import {startGalacticWar} from '../index.js'

class Connector {

   constructor(domain) {
      this.domain = domain;
      this.model = {};
      this.token = "";
   }


   dataRequest(entity, appendix, currentPage) {
      var url = "http://" + this.domain + "/data/" + entity + "?" + appendix + "&page[number]=" + currentPage + "&page[totals]";
      console.log(url);
      var that = this;
      var requestPromise = new Promise(function(resolve, reject) {
         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function(response) {
            if (this.readyState == 4 && this.status == 200) {

               console.log("xhttp done" + entity);
               var responseText = JSON.parse(xhttp.responseText);
               var currentPageData = responseText.data;



               if (responseText.meta.page != null && responseText.meta.page != undefined && responseText.meta.page.totalPages != 0) {
                  if (currentPage != JSON.parse(xhttp.responseText).meta.page.totalPages) {

                     var nextPagePromise = that.dataRequest(entity, appendix, currentPage + 1);
                     nextPagePromise.then(function(nextPageData) {


                        for (var i = 0; i < nextPageData.length; i++) {
                           currentPageData.push(nextPageData[i]);
                        }

                        resolve(currentPageData)
                     }, () => console.log("recursive DataRequest failed"))
                  }

                  else {
                     resolve(currentPageData);
                  }
               }

               else {
                  resolve(currentPageData);
               }

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

   getToken() {
      var clientOAuth2 = require('client-oauth2')
      this.token = new clientOAuth2({  clientId: 'gw-client',
                                       clientSecret: 'gw-client',
                                       accessTokenUri: 'https://MISSING.com/login/oauth/access_token',
                                       authorizationUri: 'https://MISSING.com/login/oauth/authorize',
                                       redirectUri: 'http://MISSING2.com/auth/github/callback',
                                       scopes: ['galactic-war']})
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
