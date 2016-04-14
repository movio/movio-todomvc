# WIP

* [React](https://facebook.github.io/react/)
* [Redux](http://rackt.org/redux/index.html)
* [Immutable](https://facebook.github.io/immutable-js/)
* [Material UI](http://material-ui.com/#/)
* [webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [superagent](https://visionmedia.github.io/superagent/)



# Usage

## Package installation
```bash
$ npm install
```

## Use development server
For development server, webpack-dev-server is reasonable. It monitors update files and rebuild them automatically. Since webpack cli command is registerd in `package.json` in this project, just type following command to run webpack-dev-server.

```bash
$ npm start
```

Be careful! the webpack-dev-server rebuild files in `src` automatically but the bundled files are just placed on its memory. Build manually by allowing next section(Build assets), if you want need the bundled files.


## Build assets
To put compiled files into `static` directory, type the following command.

```bash
$ npm run build
```

