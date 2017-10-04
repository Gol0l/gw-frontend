

class Connector {

   constructor(domain) {
      super(domain);
      this.domain = domain;
   }

   setupSocket(user_token, handlers) {
      var _url = "ws://" + this.domain + "/websocket?accessToken=" + user_token;
      this.socket = new WebSocket(url);
      this.socket.onmessage = function (event) {
         var data = JSON.parse(event.data);
         var handler = handlers[data.action];
         if (handler) {

            handler(data.data);
         } else {
            console.log("No handler registered for this message: " + data.action);
            console.log(data);
         }

      this.socket.onopen = function (event) {
         console.log("onOpen");
      };

      this.socket.onclose = function (event) {
         console.log("onClose");
      };
   }

   //leave id empty for all
   request(entity, id) {
      url = "http://" + this.domain + "/data/" + entity + "/" + id;

      var url = "http://" + this.domain + "/data/gwCharacter";

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(response) {
         if (this.readyState == 4 && this.status == 200) {

            return (JSON.parse(xhttp.responseText).data);

         } else if (this.readyState == 4) {
            console.log("getCharacter failed");
         }
      };
      xhttp.open("GET", url);
      xhttp.send();

   }

}
