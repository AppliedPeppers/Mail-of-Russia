var Datastore = require('nedb')
  , bd = new Datastore({ filename: 'C:/Base/path/to/database' });
bd.loadDatabase(function (err) {});