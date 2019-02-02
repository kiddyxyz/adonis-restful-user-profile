# Adonis RESTful API User Profile

In This API, you would be able to:

1. Register new user
2. Login with email
3. Login with phone number
4. Update user data
5. Update user password

## Setup
1. Ensure you already have NodeJS installed on your PC.
2. Ensure you already have AdonisJS installed on your PC. If you don't, Install AdonisJS below.

```bash
npm i -g @adonisjs/cli
```

3. Clone this repository then run `npm install`.

```bash
npm install
```

4. Copy or rename .env.example to .env
5. Setup your database environment at .env
6. Run the migration

```js
adonis migration:run
```

7. Serve the application

```js
adonis serve --dev
```

## Documentation
1. You can access the documentation through

```bash
localhost:3333/docs
```