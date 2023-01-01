import "dotenv/config";
import "module-alias/register";

import App from "./app";
import ReabilitatorController from "./models/reabilitators/reabilitators_controller";
import UserController from "./models/users/users_controller";
import envValidation from "./utils/validateEnv";
import ReportController from "./models/reports/reports_controller"
import TestController from "./models/test/test_controller";

envValidation();

const app = new App(
  [new UserController(), new ReabilitatorController(),new ReportController(), new TestController()],
  Number(process.env.PORT)
);

app.listen();