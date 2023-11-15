// Node Server which will handle socket io comnnections

const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  //socket.on is used to handle for perticuar connection
  socket.on("new-user-joined", (userName) => {
    //storing all the users that are joined
    users[socket.id] = userName;
    console.log(userName + " joined");
    //sends an event to the other users that are joined except the user that is joining
    socket.broadcast.emit("user-joined", userName);
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      userName: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leftEvent", users[socket.id]);
    delete users[socket.id];
  });
});
