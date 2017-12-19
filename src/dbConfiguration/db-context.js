var emitter = require('tiny-emitter');
var indexedDB = require('fake-indexeddb');
var dbSet = require('./db-set');

var context = function (name, version) {
    this.name = name;
    this.version = version;
    this.emitter = new emitter();
    this.configurations = [];
    var db = window.indexedDB;
    var self = this;

    function init() {
        return new Promise((resolve, reject) => {
            var createDBRequest = db.open(name, version);
            if (createDBRequest.readyState === "done") {
                resolve(createDBRequest.result);
            }
            createDBRequest.onsuccess = function (event) {
                resolve(event.target.result);
            }

            createDBRequest.onupgradeneeded = function (event) {
                var db = event.target.result;
                self.emitter.emit('setup_dbSet', db);
                self.emitter.emit('upgrade', db);
            }
            createDBRequest.onerror = (event) => {
                self.emitter.emit('error', event);
            }
        });
    }

    this.emitter.on('addConfigure', (config) => {
        var dbset = new dbSet(config, this.emitter);
        this[config.name] = dbset;
    });

    this.emitter.on('upgrade', () => {
        console.log('Upgrade call');
    });

    this.emitter.on('add', (objectStoreName, object) => {
        init()
            .then((db) => {
                var transaction = db.transaction([objectStoreName], "readwrite");
                var objectStore = transaction.objectStore(objectStoreName);
                var request = objectStore.add(object);
                request.onerror = (event) => {}
                request.onsuccess = (event) => {}
            });
        // console.log(`${objectStore} Added :- ${object}`);
    });

    this.emitter.on('remove', (objectStore, object) => {
        console.log(`${objectStore} Removed :- ${object}`);
    });

    this.emitter.on('update', (objectStore, object) => {
        console.log(`${objectStore} Update:- ${object}`);
    });

    function errorHandler(err) {
        self.emit('error', err);
    }
}

module.exports = exports = context;