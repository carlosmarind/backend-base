import express from "express";
import { configuration } from "./config.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hola mundo al usuario ${configuration.username}`);
});

app.get("/suma", (req, res) => {
  const a = 10;
  const b = 20;
  const resultado = suma(a,b);
  res.send(`la suma de ${a} + ${b} es ${suma}`)
});

export default app;

function suma(a: number, b: number) {
  throw new Error("Function not implemented.");
}
