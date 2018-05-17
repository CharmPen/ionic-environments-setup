var chalk = require("chalk");
var fs = require("fs");
var path = require("path");
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.APP_ENV? process.env.APP_ENV : process.env.IONIC_ENV;
var configEnv = process.env.IONIC_ENV;

useDefaultConfig[configEnv].resolve.alias ={
  "@app/env": path.resolve( environmentPath(env) )
};

function environmentPath(env){
  var filePath = './src/environments/environment' + (env=='dev'? '':'.'+env) + '.ts';
  if( !fs.existsSync(filePath) ){
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  }else{
    console.log(chalk.green('\nusing environment file: ' + filePath ));
    return filePath;
  }
}

module.exports = function(){
  return useDefaultConfig;
};