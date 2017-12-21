
class Connector {

   constructor(domain, tokenUrl, clientId, clientSecret, scope) {
      this.domain = domain;
      this.tokenUrl = tokenUrl;
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.scope = scope;
      this.model = {};
      this.tokenData = {};
   }

   loginUser(username, password, callback) {
      console.log("arrived");
      var that = this;
      clientCredentialsGrant( this.tokenUrl,
                              this.clientId,
                              this.clientSecret,
                              this.scope,
                              username,
                              password,
                              (response) => {
                                 that.tokenData.accessToken = response.access_token;
                                 that.tokenData.refreshToken = response.refreshToken;
                                 that.tokenData.expiresIn = response.expires_in;
                                 callback();
                              } );
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

   setupSocket(model, handlers) {
      this.model = model;
      var url = "ws://" + this.domain + "/websocket?access_token=" + this.tokenData.accessToken;
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

function clientCredentialsGrant(	url,
                                 client_id,
                                 client_secret,
                                 scope,
                                 username,
                                 password,
                                 callback) {
   /*
   var http = new XMLHttpRequest();
   var params =   "grant_type=password" +
                  "&scope=" + scope +
                  "&username=" + username +
                  "&password=" + password;
   var btoa = require("btoa");
   var authentication = btoa(client_id + ':' + client_secret);

   http.open("POST", url, true);
   http.setRequestHeader('Authorization', 'Basic ' + authentication);
   http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

   http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
         callback(JSON.parse(http.responseText));
      }
   }
   http.send(params);
   */
   console.log("you just logged in as");
   console.log("username: " + username + "password: " + password);
   callback({  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzIjo0MTAyMzU4NDAwLCAiYXV0aG9yaXRpZXMiOiBbXSwgInVzZXJfaWQiOiA1LCAidXNlcl9uYW1lIjogIkFlb24gRWNobyJ9.Kv1en5p2bWb6zE2ag6PWp4u1WxR6F8HPZSweDG23p60",
               refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzIjo0MTAyMzU4NDAwLCAiYXV0aG9yaXRpZXMiOiBbXSwgInVzZXJfaWQiOiA1LCAidXNlcl9uYW1lIjogIkFlb24gRWNobyJ9.Kv1en5p2bWb6zE2ag6PWp4u1WxR6F8HPZSweDG23p60",
               expires_in: 1000});
}

export {Connector}
