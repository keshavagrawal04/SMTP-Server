const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, callBack) {
    console.log(`onConnect ${session.id}`);
    callBack();
  },
  onMailFrom(address, session, callBack) {
    console.log(`onMailFrom ${address.address} ${session.id}`);
    callBack();
  },
  onRcptTo(address, session, callBack) {
    console.log(`onRcptTo ${address.address} ${session.id}`);
    callBack();
  },
  onData(stream, session, callBack) {
    stream.on("data", (data) => {
      console.log(`onData ${data.toString()} ${session.id}`);
    });
    stream.on("end", callBack);
  },
});

server.listen(25, () => {
  console.log("Server Is Listening On 25");
});
