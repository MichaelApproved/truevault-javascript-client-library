/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tvExplorer = {
	apiKey: "",
	accountId: "",
	endpoint: "https://api.truevault.com",
	apiVersion: "v1",
	timeout: 60000, //milliseconds
	useragent: 'TrueVault JavaScript Explorer by MichaelApproved',
	/**
	 * Function as a stub. This should be changed by your own code to 
	 * work with the individual requirements of a website.
	 */
	errorDisplay: function(message) {
		//set this to whatever you need done when an error is displayed to a user.
	},
	apiRequest: {
		/**
		 * Function as a stub. This should be changed by your own code to
		 * execute something after an API call has been successfully completed.
		 */
		Done: function() {
			//set this to whatever you need done when an API request has completed.
		},
		/**
		 * Function as a stub. This should be changed by your own code to
		 * execute something after an API call has been completed.
		 */
		Always: function() {
			//set this to whatever you need done when an API request has completed.
		},
		/**
		 * Function as a stub. This should be changed by your own code to
		 * execute something before an API call has been sent.
		 */
		BeforeSend: function(jqXHR, settings) {
			//set this to whatever you need done when an API request has completed.
		},
		/**
		 * Builds the API URL used to make the request. 
		 * @param {string} path must NOT have a leading forward slash /
		 * @returns {string} the complete URL with endpoint, apiversion and path
		 */
		createUrl: function(path) {
			$url = tvExplorer.endpoint + '/' + tvExplorer.apiVersion + '/' + path;
			return $url;
		},
		/**
		 * Makes the api request to a given path using the method along with any post vars and file transfers.
		 * @param {string} path The TrueVault path to communicate with
		 * @param {function} callback The function to run on success
		 * @param {string} method GET, POST, DELETE, PUT
		 * @param {array} params Post fields
		 * @param {array} transfer Instructions and data for file transfers.
		 * @returns {undefined}
		 */
		send: function(path, callback, method, params, transfer) {
			//set defaults

			//An action could be handled globally with the 
			//tvExplorer.apiRequestDone function of or via this callback
			//for more specific action.
			if (typeof (callback) === "undefined" || typeof (callback) === "object") {
				callback = function() {
				}
			}

			//default method to GET
			method = (typeof (method) === "undefined" || typeof (percentage) === "object") ? "GET" : method;


			if (typeof (params) !== "undefined" && typeof (params) !== "object") {
				//do post param work here
				params = '';
			}
			if (typeof (transfer) !== "undefined" && typeof (transfer) !== "object") {
				//do transfer work here
			}

			//Make the request
			jQuery.ajax({
				type: method,
				url: tvExplorer.apiRequest.createUrl(path),
				async: false,
				data: params,
				timeout: 1,
				headers: {"Authorization": "Basic " + btoa(tvExplorer.apiKey + ":")},
				beforeSend: function(jqXHR, settings) {
					tvExplorer.apiRequest.BeforeSend(jqXHR, settings);
				},
			})

					.done(function(data, textStatus, jqXHR) {
						console.log('tvExplorer.apiRequest() ajax done. Details start.');
						console.log(data);
						console.log(textStatus);
						console.log(jqXHR);
						console.log(jqXHR.getAllResponseHeaders());
						console.log('tvExplorer.apiRequest() ajax done. Details end.');

						//Is this a JSON response or is this a file?
						if (jqXHR.getResponseHeader('content-type') == 'application/json') {
							if (data.result === 'success') {
								callback(data);
							} else {
								//display an error to the visitor
								tvExplorer.errorDisplay('Record Request error', data);
							}
						} else {
							//Likely 'application/octet-stream'
							//Pass the data object to the callback function.
							//Allow it to processing the file.
							callback(data);
						}
						tvExplorer.apiRequest.Done(data);
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						//log the details to console.
						console.log('tvExplorer.apiRequest() ajax fail. Details start.');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
						console.log('tvExplorer.apiRequest() ajax fail. Details end.');
						//display an error to the visitor
						displayMessage = (jqXHR.responseJSON === undefined) ? jqXHR.statusText : jqXHR.responseJSON.error.message + "\n(" + jqXHR.statusText + ")";
						tvExplorer.errorDisplay('Record Request failed: ' + displayMessage);
					})
					.always(function() {
						tvExplorer.apiRequest.Always();
					});
		},
	},
	vaults: {
		/**
		 * Finds a list of vaults for the account Id
		 * 
		 * @param {function} callback The function to run on success.
		 * @returns {undefined}
		 */
		findAll: function(callback) {
			path = 'accounts/' + tvExplorer.accountId + '/vaults';

			tvExplorer.apiRequest.send(path, callback, "GET");
		},
	},
	schemas: {
		/**
		 * Find all schemas for a given vault
		 * @param {type} vaultId The ID of the vault to search.
		 * @param {type} callback The function to execute on a successful request.
		 * @returns {undefined}
		 */
		findAll: function(vaultId, callback) {
			var path = 'vaults/' + vaultId + '/schemas';

			tvExplorer.apiRequest.send(path, callback, "GET");
		},
		/**
		 * Get schema details
		 * @param {type} vaultId The ID of the vault to search.
		 * @param {type} schemaId The ID of the schema to get details of.
		 * @param {type} callback The function to execute on a successful request.
		 * @returns {undefined}
		 */
		get: function(vaultId, schemaId, callback) {
			var path = 'vaults/' + vaultId + '/schemas/' + schemaId;

			tvExplorer.apiRequest.send(path, callback, "GET");
		},
		update: function(vaultId, schemaId, schemaContent, callback) {
			var path = 'vaults/' + vaultId + '/schemas/' + schemaId;

			//Base64 (btoa) encode the string.
			documentContentBase64 = btoa(schemaContent);

			tvExplorer.apiRequest.send(path, callback, "PUT", {"schema": documentContentBase64});
		},
		create: function(vaultId, schemaContent, callback) {
			var path = 'vaults/' + vaultId + '/schemas';

			//Base64 (btoa) encode the string.
			documentContentBase64 = btoa(schemaContent);

			tvExplorer.apiRequest.send(path, callback, "POST", {"schema": documentContentBase64});
		},
	},
	documents: {
		/**
		 * Will return all documentIds in a vault.
		 * A method to search for all docuemnts isn't documented with TrueVault API
		 * so I hacked a method together by searching for all documents with a
		 * fake (hopefully non-existant) field that I don't expect any documents to have.
		 * More details are in the function code.
		 * 
		 * Documents are come paged with 100 per page. To get another page, pass the
		 * next page number into the request.
		 * 
		 * @param {type} vaultId The ID of the vault to return all data from.
		 * @param {integer} page The page number to get.
		 * @param {type} callback The function to execute on a successful request.
		 * @returns {undefined}
		 */
		findAll: function(vaultId, page, callback) {
			var path = 'vaults/' + vaultId + '/documents';

			//Include search options to get additional pages of information
			var searchOption = {
				per_page: 10,
				page: page,
			};

			//convert the serachOption array into a string and then base64 encode it.
			searchOptionBase64 = btoa(JSON.stringify(searchOption));

			//send the request
			tvExplorer.apiRequest.send(path + '?search_option=' + searchOptionBase64, callback, "GET");

		},
		/**
		 * Returns the contents of a document.
		 * TODO - Extended this to accept an array for documentd(s) for multiple documents in one request.
		 * @param {array} documentId Either a string with a single documentId or an array of documentIds.
		 * @returns {undefined}
		 */
		get: function(vaultId, documentId, callback) {
			var path = 'vaults/' + vaultId + '/documents/' + documentId;

			tvExplorer.apiRequest.send(path, callback, "GET");
		},
		delete: function(vaultId, documentId, callback) {
			var path = 'vaults/' + vaultId + '/documents/' + documentId;

			tvExplorer.apiRequest.send(path, callback, "DELETE");
		},
		update: function(vaultId, schemaId, documentContent, documentId, callback) {
			var path = 'vaults/' + vaultId + '/documents/' + documentId;

			//Base64 (btoa) encode the string.
			documentContentBase64 = btoa(documentContent);

			//Only include the schema in the request if it was sent.
			if (schemaId === '') {
				tvExplorer.apiRequest.send(path, callback, "PUT", {"document": documentContentBase64});
			} else {
				tvExplorer.apiRequest.send(path, callback, "PUT", {"document": documentContentBase64, "schema_id": schemaId});
			}
		},
		create: function(vaultId, schemaId, documentContent, callback) {
			var path = 'vaults/' + vaultId + '/documents';

			//Base64 (btoa) encode the string.
			documentContentBase64 = btoa(documentContent);

			//Only include the schema in the request if it was sent.
			if (schemaId === '') {
				tvExplorer.apiRequest.send(path, callback, "POST", {"document": documentContentBase64});
			} else {
				tvExplorer.apiRequest.send(path, callback, "POST", {"document": documentContentBase64, "schema_id": schemaId});
			}
		},
	},
}

