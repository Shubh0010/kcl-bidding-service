const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { completeBid, getAllPlayers, getAllTeams, createSession, getSessionData, makeBid } = require("./src/controllers/controllers");

const app = express();

connection = undefined;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// Routes
app.get('/players', getAllPlayers);
app.get('/teams', getAllTeams);
app.post('/create_session', createSession);
app.get('/session', getSessionData);
app.post('/make_bid', makeBid);
app.post('/complete_bid', completeBid);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
