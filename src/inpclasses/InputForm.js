
//the inputForm receives a template object of types and compares it to an object of types it generates from the parameters that were given to it
//it is supposed to be extended with a subclass that contains the template for the final input object

//basically the MyName Component will have a file+class InpMyName that should be used to create an object that is handed to MyName. MyName will also accept other parameters, but if you give InpMyName
//incorrect data it will throw an error (It only checks for type and possibly the composition of an "object"; depends how it is used).
class InputForm {
   constructor() {

   }

   validate(inputObject) {
      (this.compare(this.template, inputObject)) ? this.assign(inputObject) : {}
   }
   compare(template, object) {

      var types = new Object();
      for (var key in object) {
         if (object.hasOwnProperty(key)) {
            types[key] = (Array.isArray(object[key])) ? "array" : typeof object[key];
         }
      }

      var correct = true;
      if (Object.keys(template).length = Object.keys(types).length) {
         for (var key in template) {
            if (template.hasOwnProperty(key) && types.hasOwnProperty(key)) {
               if (template[key] != types[key] && template[key] != "arbitrary") {
                  correct = false;
                  console.log("value that caused error: ", object[key])
                  throw new Error("different type at key: " + key)
               }
            }
            else {
               correct = false;
               throw new Error("key not in input object: " + key)
            }
         }
      }
      else {
         correct = false;
         throw new Error("number of keys in input object not correct")
      }
      return (correct)
   }


   assign(object) {
      for (var key in object) {
         if (object.hasOwnProperty(key)) {
            this[key] = object[key];
         }
      }
   }
}




export {InputForm};
