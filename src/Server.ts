import app from "./App";
import config from "./utils/Config";
import logger from "./utils/Logger";

const log = logger("Server");
const port = config.get("APP_PORT");

app.listen(port, () => {
  log.logInfo(`Moana is listening on port: ${port}`);
});
