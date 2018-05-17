# ionic-environments-setup
This project is based on gshigeto's contribution. Please refer to 'https://github.com/gshigeto/ionic-environment-variables' if you are interested in.

The main issue of ionic-environment-variables project is that when you need more than two sets of evironment variables, only the development mode are allowed except the `environemtn.ts` file and the `ionic build`/`ionic build --prod` commands may not take effect.

Add the following to your `package.json`:
```json
"config": {
  "ionic_webpack": "./config/webpack.config.js"
}
```

Add the following to your `tsconfig.json` in `compilerOptions`:
```json
"baseUrl": "./src",
"paths": {
  "@app/env": [
    "environments/environment"
  ]
}
```

Create a file in your base directory `config/webpack.config.js` and paste the following:
```javascript
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
```

Create a default file `src/environments/environment.ts` which will be used for your default **development** environment:
```typescript
export const ENV = {
  mode: 'Development'
}
```

Create a default file `src/environments/environment.prod.ts` which will be used for your default **PRODUCTION** environment:
```typescript
export const ENV = {
  mode: 'Production'
}
```

Create your other file, for example `src/environments/environment.testing.ts`. This should be whatever you set your `APP_ENV` to in `config/webpack.config.js` file.

Add to your `package.json` another run script for development builds
```json
"build:testing": "APP_ENV=testing ionic-app-scripts build"
```
or for production builds
```json
"build:testing": "APP_ENV=testing ionic-app-scripts build --prod"
```

You can then import your environment variables anywhere!
```typescript
import { ENV } from '@app/env'
```

To test the default development builds: `ionic build`.
To test the default production builds: `ionic build --prod`.
To test the other development/production builds: `npm run build:testing`.
Then open the `www/index.html` file in your browser.
