# githubtopcontributors
 ![alt tag](https://travis-ci.org/stanleyta/githubtopcontributors.svg?branch=master)
 
githubtopcontributors is a site built in node.js which utilizes the [githubtopcontributors_module](https://github.com/stanleyta/githubtopcontributors_module) to query the GitHub API to retrieve the "top 10" contributors. The site provides an interface where the results are displayed using ngGrid / angularUI.

This project was intended purely as a learning exercise, but is kept on github as a learning tool for anyone interested.

Installation
---

This project is available on [GitHub](https://github.com/stanleyta/githubtopcontributors), and also avilable as an
[NPM package](https://www.npmjs.org/package/githubtopcontributors_module).

To start, download the source from [GitHub](https://github.com/stanleyta/githubtopcontributors). Navigate to the project folder and run `npm install` to install the project's dependencies.

Alternatively, you can install via NPM using the command `$ npm install githubtopcontributors_module`. Navigate to the project folder.

Usage
---

Run the following command to start the server:

```js
node server.js
```
or
```js
npm start
```

Then,  navigate to [http://localhost:3001/](http://localhost:3001/).

You'll need to login with your github credentials via oauth before accessing the API and main access page.

Once you're authenticated, to access the top 10 contributors to a repository, enter the path of the repository e.g. `/repos/stanleyta/githubtopcontributors/contributors`, click 'Go', and voila. The ngGrid will populate with the top 10 contributors sorted by rank.

Once the table has been loaded, you can sort the table however you wish.

Running Tests
---

Install `mocha` globally with the following command:

```bash
npm install -g mocha
```

Then simply run the tests by running:

```bash
npm test
```

License
---

Licensed under [MIT](https://github.com/stanleyta/githubtopcontributors_module/blob/master/LICENSE).
