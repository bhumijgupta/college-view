# College-View

Your one stop destination to view all your college and student data intuitively

<h1 align="center">College-View</h1>
<p align="center">
Your one stop destination to view all your college and student data intuitively
</p>

## Documentation

Coming Soon

## Try Online

The frontend is deployed on [gh-pages](https://bhumijgupta.github.io/college-view/index.html). Have fun :sunglasses:

## Run Locally

### Running backend

#### 1. Seed mongodb

To seed collections with random data run:

```
cd backend/seed
node seedCollege.js
node seedStudent.js
node seedStudentNum.js
```

**Note:** Please maintain the same order of execution

#### 2. Setup `.env` file

Create `.env` and add `MONGODB_URI` values from previous step

#### 3. Running server

Finally, the awaited step
`npm run start`

### Running frontend

The frontend are static html files. They can be served using any web server. For convenient use, we'll use [serve](https://www.npmjs.com/package/serve).

```bash
# Install serve globally
sudo npm i -g serve
# Serve the frontend
cd frontend && serve
```

## Linting

The project uses eslint and prettier to lint the files.The configuration files are [.eslintrc](./.eslintrc), [.eslintignore](./eslintignore) and [.prettierignore](./prettierignore).<br>
You can manually lint code using

```javascript
npm run lint
```

## Author

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

### Bhumij Gupta

![GitHub followers](https://img.shields.io/github/followers/bhumijgupta?label=Follow&style=social) [![LinkedIn](https://img.shields.io/static/v1.svg?label=connect&message=@bhumijgupta&color=success&logo=linkedin&style=flat&logoColor=white)](https://www.linkedin.com/in/bhumijgupta/) [![Twitter URL](https://img.shields.io/twitter/url?style=social&url=http%3A%2F%2Ftwitter.com%2Fbhumijgupta)](https://twitter.com/bhumijgupta)

---

```javascript
if (repo.isAwesome || repo.isHelpful) {
  StarRepo();
}
```
