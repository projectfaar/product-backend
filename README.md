# product-backend
Database and REST API backend to manage products

#Usage
    node rest.js [config.json]

Configuration file optional; defaults to config.json.

#API
By default, `rest.js` listens on port 8080 at the bare endpoint `/api/`. URLs look like:

    http://localhost:8080/api/getProductByName?name=potato

Parameters are specified in the URL. This request returns a JSON object in the following format if the transaction was successful:

    {
      "status": 0,
      "product": {
        ...
      }
    }

If the transaction failed from some reason, the result will look like the following:

    {
      "status": -1,
      "errorMessage": "..."
    }

#Endpoints

##getProductByName

`getProductByName` returns a Product object based on a name:

Parameters:

_String_ `name`

Return:

Product product;

#Product Object
The product object represents all the necessary information with respect to a product. An example is as follows:

The general schema is:

    struct Product {
      String name;
      int id;
      int aisle;
      int aislePosition;
    }

    {
      "name": "potato",
      "id": 1234,
      "aisle": 7,
      "aislePosition": 64
    }

`name` is a lowercase product name, `id` is a unique ID of some sort, `aisle` is the aisle number in the store, and `aislePosition` is represents the "Y" coordinate on the store map, where 0 is the absolute top and 255 is the bottom. `aislePosition` can be treated as a percentage with a denominator of 256.
