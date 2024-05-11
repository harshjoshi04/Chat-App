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
      console.log(email);
      EmailToId[email] = socket.id;
      IdToEmail[socket.id] = email;
    });

    socket.on("sendRequest", ({ email }) => {
      io.to(EmailToId[email]).emit("receiveRequest", {
        email: IdToEmail[socket.id],
      });
    });

    socket.on("disconnect", () => {
      //   console.log("Socket disconnected:", socket.id);
    });
  });
}

export default SocketFunction;
