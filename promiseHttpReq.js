'use strict';

// A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url) {
 
  // A small example of object
  var core = {
    // Method that performs the ajax request
    ajax: function (method, url, args) {
      console.log('ajax');
      // Creating a promise
      var promise = new Promise(function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status == 200) {
            // Performs the function "resolve" when this.status is equal to 200
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 200
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get': function (args) {
      console.log('get', args);
      return core.ajax('GET', url, args);
    },
    'post': function (args) {
      console.log('post');
      return core.ajax('POST', url, args);
    },
    'put': function (args) {
      console.log('put');
      return core.ajax('PUT', url, args);
    },
    'delete': function (args) {
      console.log('delete');
      return core.ajax('DELETE', url, args);
    }
  };
};
// End A

// B-> Here you define its functions and its payload
var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
var payload = {
  'topic': 'js',
  'q': 'Promise'
};

var callback = {
  success: function (data) {
        console.log(1, 'success', JSON.parse(data));
  },
  error: function (data) {
        console.log(2, 'error', JSON.parse(data));
  }
};
// End B

// Executes the method call 
$http(mdnAPI)
  .get(payload)
  .then(callback.success)
  .catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case 
$http(mdnAPI)
  .get(payload)
  .then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case 
$http(mdnAPI)
  .get(payload)
  .then(callback.success)
  .then(undefined, callback.error);