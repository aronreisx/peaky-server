require('dotenv').config()
const { SERVER_PORT } = process.env;

import express from 'express';

const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`[server] Server started on PORT ${SERVER_PORT}`)
})
