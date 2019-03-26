module.exports = function(env){
  let environment = (env || process.env.NODE_ENV || 'development');
  var json = require('./' + environment + '.json');
  json.environment = environment;

  //console.log( JSON.stringify(json) );
  return json;
}
