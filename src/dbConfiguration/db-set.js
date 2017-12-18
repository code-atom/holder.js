var emitter = require('tiny-emitter');


var dbset = function (name) {
    this.name = name;
    this.dbsetEmitter = new emitter();
};

dbset.add = function (object) {
    this.dbsetEmitter.emit('add', this.name, object);
}

dbset.remove = function (object) {
    this.dbsetEmitter.emit('remove', this.name, object);
}

dbset.update = function (object) {
    this.dbsetEmitter.emit('update', this.name, object);
}

exports.dbSet = dbset;
