# githubtopcontributors
---

Node.js site using the [githubtopcontributors_module](https://github.com/stanleyta/githubtopcontributors_module) that queries the GitHub API, retrieves the "top 10" contributors, and displays the results with an ngGrid using angularJS.

Installation
---

This project is available on [GitHub](https://github.com/stanleyta/githubtopcontributors).

Usage
---
To start, download the source from [GitHub](https://github.com/stanleyta/githubtopcontributors). Navigate to the project folder and run `npm install` to install the project's dependencies.

Then run the following command:

```js
npm start
```

and from there navigate to [http://localhost:3001/](http://localhost:3001/).

You'll need to login with your github credentials via oauth before accessing the API and main access page.

Once you're authenticated, to access the top 10 contributors to a repository, enter the path of the repository e.g. `/repos/stanleyta/githubtopcontributors/contributors`, click 'Go', and voila. The ngGrid should populate with the top 10 contributors sorted by rank.

Once the table has been loaded, you can sort the table however you wish.

Running Tests
---

Install `mocha` globally. Then run the following command:

```bash
npm install -g mocha
```

Then simply run the tests.

```bash
npm test
```

License
---

Licensed under [MIT](https://github.com/stanleyta/githubtopcontributors_module/blob/master/LICENSE).
