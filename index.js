var holder = require('./src/dbHolder');

var sampleHolder = new holder('testObjectStore');
sampleHolder.configObjectHolder({
    name: 'test'
})
var testHolder = sampleHolder.objectHolder('test');
testHolder.add({abc: 'asdfadf'});
console.log(sampleHolder, testHolder);