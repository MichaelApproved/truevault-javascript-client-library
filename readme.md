A TrueVault JavaScript Client Library
==========

An unofficial JavaScript implementation of the [TrueVault REST API](https://www.truevault.com/documentation/rest-api.html).

[TrueVault](https://www.truevault.com/) is a secure "backend-as-a-service" content storage solution for HIPAA compliance.  

**The library requires jQuery to function.**

## Overview

Add the JS file to your project, set the apiKey, accountId and make the requests using tvExplorer, the pseudo-class created to communicate with TrueVault.

tvExplorer allows you to view all vaults, schemas and documents. You can also create/edit existing schemas and documents as well, among other things.

The class is extendable and designed to return information through callbacks and events.

TIP: I built a great web based client tool called [truevault-javascript-explorer](https://github.com/MichaelApproved/truevault-javascript-explorer) that helps you manage TrueVault.com objects. It uses this library and is a great resource for seeing what's possible in addition to helping you manage your objects.

## Usage
-----

List all vaults
```js
tvExplorer.apiKey = 'MY-TRUEVAULT-API';
tvExplorer.accountId = 'MY-TRUEVAULT-ACCOUNTID';
tvExplorer.vaults.findAll(displayAllVaults);

function displayAllVaults(data) {
    //Do something with data here;
}
```
 
In the example below, I list all schemas. It assumes the variable `vaultId` already has the correct vault value.

```js
tvExplorer.schemas.findAll(vaultId, displayAllSchemas);

function displayAllSchemas(data) {
    //Loop through the array of data.schemas to display the information
}
```

## Helpful Resources

You might find the [Medicast node.js client library](https://github.com/medicast/truevaultjs) helpful.


## Plain-English Disclaimer

HIPAA compliance is very complicated.  The authors and contrbutors of this client library cannot guarantee that by using it, you will be compliant.  Please consult experts to make sure you are doing this right!

## License

This code is distributed under the [MIT License](http://opensource.org/licenses/MIT).

```no-highlight
Copyright (c) 2014 Michael Khalili *(Michael@MichaelApproved.com)*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```