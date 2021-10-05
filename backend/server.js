const express = require("express");
// const path = require("path"); // react build 파일에 접근하기 위해 필요함
const port = process.env.PORT || 5000;

const app = express();

const cors = require('cors')
app.use(cors());

app.use(express.static(path.join(__dirname, "../fronted/build")));
 
// app.use("/", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });
app.get("/", (req, res) => {
  console.log(__dirname);
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, function () {
  console.log("server works on port :" + port);
});

// back/app.js
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const airDrawingModule = require("./public/AirDrawing/AirDrawing");
const airDrawingStateModule = require("./public/AirDrawing/AirDrawingState"); // 같은 디렉토리에 있다고 가정
const requestPongModule = require("./public/AirDrawing/AirDrawingRequest"); // 같은 디렉토리에 있다고 가정

const user = require("./src/Routes/User");
const game = require("./src/Routes/Game");
const achievement = require("./src/Routes/Achievement");
app.use("/user", user);
app.use("/game", game);
app.use("/achievement", achievement);

airDrawingModule.airDrawing(io, airDrawingStateModule);
requestPongModule.airDrawingRequest(app, airDrawingStateModule);
httpServer.listen(80);

module.exports = app;
