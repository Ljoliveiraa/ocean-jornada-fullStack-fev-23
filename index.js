const express = require("express");

const { MongoClient } = require("mongodb");

// const DB_url= "mongodb://127.0.0.1:27017";
const DB_url= "mongodb+srv://admin:UrxLMigeFHyHZVHr@cluster0.648akqm.mongodb.net";
const DB_NAME="ocean-bancoDados-09-02-2023";


 async function main(){

//conexão com o banco de dados
console.log("conectando com o banco de dados....");
const client =  await MongoClient.connect(DB_url); //awit esperar 
const db =client.db(DB_NAME)
const collection = db.collection("itens")
console.log("Banco de dados conectado com sucesso");


const app = express();
// body esta em json
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Para de onda...");
});

app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});
//lista de informações
const itens = ["Lucas josé", "Izabelle araújo", "Clarice araújo"];

//crud -> lista de informações

//endpoint create -> [get]./ itens
app.get("/item",async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

//endpoint rea single by ID -> [get]/item/ :id

app.get("/item/:id", function (req, res) {
  const id = req.params.id;
  const item = itens[id - 1];
  res.send(item);
});

//endpoint create  -> [post] /item
app.post("/item", function (req, res) {
  // console.log(req.body);
  const item = req.body;
  itens.push(item.nome);
  res.send("Item criado com sucesso!");
});

app.listen(3000);
}
main()

// const express = require("express");
// const app = express();
// // O que vier no body da requisição, está em JSON
// app.use(express.json());
// // Endpoint / -> Hello World
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
// // Endpoint /oi -> Olá, mundo!
// app.get("/oi", function (req, res) {
//   res.send("Olá, mundo!");
// });
// // Lista de informações
// const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"];
// //              0               1              2
// // CRUD -> Lista de informações
// // Endpoint Read All -> [GET] /item
// app.get("/item", function (req, res) {
//   res.send(itens);
// });
// // Endpoint Read Single by ID -> [GET] /item/:id
// app.get("/item/:id", function (req, res) {
//   const id = req.params.id;
//   const item = itens[id - 1];
//   res.send(item);
// });

// // Endpoint Create -> [POST] /item
// app.post("/item", function (req, res) {
//   console.log(req.body);
//   // res.send("Create");
//   const item = req.body;
//   itens.push(item.nome);
//   res.send("Item criado com sucesso!");
// });

// app.listen(3000);