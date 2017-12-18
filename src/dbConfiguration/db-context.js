var emitter = require('tiny-emitter');
var dbSet = require('./db-set');
require('./db-seeder');

var context = function (name, version) {
    this.name = name;
    this.version = version;
    this.emitter = new emitter();
    this.configurations = [];
    var db = window.indexedDB;
    var createDBRequest = db.open(name, version);
    if (creationRequest.readyState === "done") {
        promise.resolve(creationRequest.result);
    }
    creationRequest.onsuccess = function (event) {
        promise.resolve(event.target.result);
    }

    creationRequest.onupgradeneeded = function (event) {
        var db = event.target.result;
        this.configurations.forEach(name => {
            this[name]
        });
    }
    creationRequest.onerror = (event) => {
        throw new Error('error while connecting to db')
    }

    this.emitter.on('addConfigure', (model) => {
        var dbset = new dbSet(model.name);
        this[model.name] = dbSet;
        this.configurations.push(model.name);
    })
    this.emitter.on('upgrade', () => {
        console.log('Upgrade call');
    })

    this.emitter.on('add', (objectStore, object) => {
        console.log(`${objectStore} Added :- ${object}`);
    });
    this.emitter.on('remove', (objectStore, object) => {
        console.log(`${objectStore} Removed :- ${object}`);
    });
    this.emitter.on('update', (objectStore, object) => {
        console.log(`${objectStore} Update:- ${object}`);
    });


}

exports.context = context;