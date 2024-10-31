import { configuration } from "./config";
import  app  from "./server";

app.listen(configuration.port, () => {
  console.log(`El usuario ${configuration.username} ha levantado la aplicacion en el puerto ${configuration.port}`);
});