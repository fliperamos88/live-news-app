const express = require('express');
require('dotenv').config();
const app = express();
const expressWs = require('express-ws')(app);
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));
app.use(cors({ credentials: true, origin: true }));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: true },
});

let lastResponse;
let res;
let counter = 0;
const getNews = async () => {
  lastResponse = res;
  counter++;
  try {
    const { articles } = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 6,
      country: 'us',
      // alternatively we can use a counter to rotate through the news pages instead of showing only the top 6 most relevant
      // page: counter,
      page: 1,
      sortBy: 'relevancy',
    });
    return articles;
  } catch (err) {
    counter = 0;
    return lastResponse;
  }
};

setInterval(async (evt) => {
  res = await getNews();
}, 900000);

io.on('connection', (socket) => {
  socket.emit('news', res);
  setInterval(async (evt) => {
    socket.emit('news', res);
  }, 15000);
});

server.listen(process.env.PORT || 4000, async () => {
  res = await getNews();
});
