const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const {todoPackage} = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

let todos = [];

let createTodo = (call, callback) => {
  console.log(call);
  const item = { id: todos.length + 1, text: call.request.text };
  todos.push(item);
  callback(null, item);
};

let readTodos = (call, callback) => {
  callback(null, {items: todos});
};

let readTodosStream = (call, callback) => {
  todos.forEach(todo => {call.write(todo);});
  call.end();
};

server.addService(todoPackage.Todo.service, {
  "createTodo": createTodo,
  "readTodos": readTodos,
  "readTodosStream": readTodosStream,
});

server.start();
