var emitter = require('tiny-emitter');
var context = require('./dbConfiguration/db-context');
var upgraderEmitter = new emitter();

function holder(name, version) {
    this.context = new context(name, version);
}

holder.prototype.configObjectHolder = function (config) {
    config.name = config.name || 'objectStore' + this.objectStoreCount++;
    this.context.emit('addConfigure', config);
}

holder.prototype.upgraderHolder = function (callback) {
    this.context.emit('upgrade', callback);
}

