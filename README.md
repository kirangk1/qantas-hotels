# Qantas Hotels App

React + TypeScript app for browsing hotels, sorting by price/popularity, and viewing hotel details.

## Run Locally

```bash
npm install
npm start
```

or

```bash
yarn install
yarn start
```

Open `http://localhost:3000`.

## Scripts

- `npm test` / `yarn test` -> run tests
- `npm run build` / `yarn build` -> production build
- `npm run lint` / `yarn lint` -> lint and auto-fix

## Routes

- `/` -> hotel list
- `/hotel/:id` -> hotel details

## Data

- `public/data/hotelsDetails.json`
- `public/images/hotels/`

Assets use `process.env.PUBLIC_URL` so paths work on nested routes.
