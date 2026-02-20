# Backend deployment notes

Quick steps to deploy the backend and serve the built client from the same server.

Local production build

1. From the `backend` folder, build the client and install dependencies:

```bash
cd ../client/client
npm install
npm run build
cd ../../backend
```

2. Set environment variables (example):

```bash
export MONGO_URI="your_mongo_uri"
export PORT=5000
export FRONTEND_URL="https://your-deployed-url"
export NODE_ENV=production
```

On Windows PowerShell use `$env:MONGO_URI = "..."` etc.

3. Start the server:

```bash
npm start
```

Notes
- The `postinstall` and `heroku-postbuild` scripts will build the client automatically when running `npm install` in the `backend` folder on many platforms.
- The server will serve the Vite `dist` folder at `../client/client/dist` when `NODE_ENV=production` or when `SERVE_CLIENT=true`.
