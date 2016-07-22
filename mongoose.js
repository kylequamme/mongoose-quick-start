var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  //we're connected!
  console.log('We\'re Connected!');
});

var kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function(){
  var greeting = this.name
  ? "Meow name is " + this.name
  : "I don't have a name";
  console.log(greeting);
};

var Kitten = mongoose.model('Kitten', kittySchema);

var furball = new Kitten({name: 'Furball'});

var fluffy = new Kitten({name: 'fluffy'});
fluffy.speak();

fluffy.save(function(err, fluffy){
  if(err){
    return console.error(err);
  }else{
    fluffy.speak;
  }
});

Kitten.find(function(err, kittens){
  if(err){
    return console.error(err);
  }else{
    console.log(kittens);
  }
});

Kitten.find({name: /^Fluff/ }, function(err, kittens){
  console.log('Kittens found:', kittens);
});
