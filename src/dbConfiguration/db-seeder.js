var emitter = require('tiny-emitter');
var seedEmitter = new emitter();

seedEmitter.on('seed', (store, objects) => {
    if (typeof objects === 'Array') {
        objects.forEach(object => {
            store.add(object);
        });
    }
})