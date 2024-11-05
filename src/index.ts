import { configuration } from "./config/index.js";
import  app  from "./server.js";

app.listen(configuration.port, () => {
  console.log(`El usuario ${configuration.username} ha levantado la aplicacion en el puerto ${configuration.port}`);
});