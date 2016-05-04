#Getting Started

```
> git init
> npm init
> npm install --save babel-preset-es2015 body-parser bower lodash
> npm install --save-dev gulp gulp-babel gulp-sass gulp-sourcemaps gulp-concat
> bower init
> bower install --save jquery underscore backbone bootstrap
```


##Example `package.json`

```
{
  "name": "todo-backbone",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "heroku-prebuild": "echo This ran before Heroku installs dependencies.",
    "start": "node server",
    "heroku-postbuild": "echo This runs afterwards.",
    "postinstall": "bower cache clean && bower install",
    "dev": "nodemon server & gulp"
  },
  "engines" : {
    "node": "^6.0.0",
    "npm" : "^3.8.8"
  },
  "repository" :
    { "type" : "git"
    , "url" : "https://github.com/alexsasharegan/backbone-todo.git"
  },
  "author": "alex regan",
  "license": "ISC",
  "dependencies": {
    "babel-preset-es2015": "^6.6.0",
    "body-parser": "^1.15.0",
    "bower": "^1.7.9",
    "express": "^4.13.4",
    "gulp": "^3.9.1",
    "lodash": "^4.11.1"
  },
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-babel": "^6.1.2",
    "gulp-sass": "^2.3.1",
    "gulp-sourcemaps": "^2.0.0-alpha"
  }
}
```

##Example `bower.json`

```
{
  "name": "todo-backbone",
  "description": "",
  "main": "server.js",
  "authors": [
    "alex regan"
  ],
  "license": "ISC",
  "homepage": "",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "underscore": "^1.8.3",
    "backbone": "^1.3.3",
    "jquery": "^2.2.3",
    "bootstrap": "^3.3.6"
  }
}
```
