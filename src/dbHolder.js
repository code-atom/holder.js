var emitter = require('tiny-emitter');
var context = require('./dbConfiguration/db-context');
var upgraderEmitter = new emitter();

function holder(name, version) {
    if (!name)
        throw new Error('Specify the holder name');
    this.context = new context(name, version || 1);
}

holder.prototype.configObjectHolder = function (config) {
    config.name = config.name || 'objectStore' + this.objectStoreCount++;
    this.context.emitter.emit('addConfigure', config);
}

holder.prototype.upgraderHolder = function (callback) {
    this.context.emitter.emit('upgrade', callback);
}

holder.prototype.objectHolder = function (name) {
    if (!this.context[name]) {
        throw new Error('Specified holder does not exist');
    }
    return this.context[name];
}

module.exports = exports = holder;