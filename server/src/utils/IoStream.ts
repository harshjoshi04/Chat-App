import http from "http";
import { Server, Socket } from "socket.io";

const EmailToId: any = {};
const IdToEmail: any = {};

function SocketFunction(server: http.Server) {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("userConnect", ({ email }) => {
      EmailToId[email] = socket.id;
      IdToEmail[socket.id] = email;
    });

    socket.on("sendRequest", ({ email }) => {
      io.to(EmailToId[email]).emit("receiveRequest", {
        email: IdToEmail[socket.id],
      });
    });

    // message
    socket.on("sendMessage", ({ email, data }) => {
      const socketId = EmailToId[email];
      io.to(socketId).emit("getMessage", data);
    });

    // SendReacation
    socket.on("sendReaction", ({ email, id, type, image }) => {
      const socketId = EmailToId[email];
      console.log(socketId);
      io.to(socketId).emit("recieveReaction", { id, type, image });
    });

    socket.on("disconnect", () => {
      let email = EmailToId[socket.id];
      delete IdToEmail[email];
      delete EmailToId[socket.id];
      //   console.log("Socket disconnected:", socket.id);
    });
  });
}

export default SocketFunction;
