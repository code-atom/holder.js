var emitter = require('tiny-emitter');

var defaultIndexing = {
    keyPath: '_id',
    autoIncrement: true
};

var dbset = function (config, emitter) {
    this.config = config
    this.name = config.name;
    if (!('indexes' in config)) {
        config.indexes = [];
    }
    this.dbsetEmitter = emitter;
    this.dbsetEmitter.on('setup_dbSet', (databse) => {
        var objectStore = databse.createObjectStore(this.name, defaultIndexing);
        if ((typeof config.indexes !== 'undefined') && (config.indexes.length > 0)) {
            for (var i = 0; i < config.indexes.length; i++) {
                objectStore.createIndex(config.indexes[i].name, config.indexes[i].keyPath, config.indexes[i].options);
            }
        }
        if ((typeof config.seed !== 'undefined') && (config.seed.length > 0)) {
            for (var data of config.seed) {
                objectStore.add(data);
            }
        }
    });
};

dbset.prototype.add = function (object) {
    this.dbsetEmitter.emit('add', this.name, object);
}

dbset.prototype.remove = function (object) {
    this.dbsetEmitter.emit('remove', this.name, object);
}

dbset.prototype.update = function (object) {
    this.dbsetEmitter.emit('update', this.name, object);
}

module.exports = exports = dbset;