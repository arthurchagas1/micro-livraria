const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');

function startInventoryServer(server) {
  server.addService(InventoryService, {
    SearchAllProducts: (empty, callback) => {
      callback(null, { products });
    },

    // Adicione esta função logo após:
    SearchProductByID: (payload, callback) => {
      const id = payload.request.id;
      const product = products.find(p => p.id === id);
      // Se não achar, product será undefined; tudo bem pra um exemplo didático
      callback(null, product);
    },
  });
}

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do InventoryService
server.addService(inventoryProto.InventoryService.service, {
    searchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },
});

server.bindAsync('127.0.0.1:3002', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Inventory Service running at http://127.0.0.1:3002');
    server.start();
});
