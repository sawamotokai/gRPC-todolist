const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const {todoPackage} = grpc.loadPackageDefinition(packageDef);
 
const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());
 
client.createTodo({
  id: -1,
  text: "Laundry"
}, (err, res) => {
  console.log("Received from server " + JSON.stringify(res));
});

client.readTodos({}, (err, res) => {
  // console.log("Received from server " + JSON.stringify(res));
  res.items.forEach(i => {console.log(i.text)});
});