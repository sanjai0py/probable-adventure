const express = require("express");
const { createServer } = require("node:http");
const cors = require("cors");
const app = express();
const path = require("node:path");
const swaggerParser = require("swagger-parser");

const { Server } = require("socket.io");
const httpserver = createServer(app);

app.use(express.json());
app.use(cors());

const socketServer = new Server(httpserver, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use("/index.html", express.static(path.join(__dirname, "index.html")));

app.use("/node_modules", express.static("node_modules"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/update", (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.data);
    swaggerParser.validate(parsedData, (err, api) => {
      // if (err) {
      //   console.error(err);
      //   res.status
      //     .status(400)
      //     .send({ message: "Invalid Swagger JSON", error: err });
      // }
      socketServer.emit("TEXT_UPDATE", { data: parsedData });
      // res.status(200).send({ message: "Swagger JSON is valid" });
    });
  } catch (error) {
    res.status(400).send({ message: "Invalid JSON", error });
  }
});

socketServer.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpserver.listen(9000, () => {
  console.log("Server is running on port 9000");
});
