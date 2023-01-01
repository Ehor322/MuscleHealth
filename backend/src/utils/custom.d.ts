import Reabilitator from "../models/reabilitators/reabilitators_interface";
import User from "../models/users/users_interface";

declare global {
  namespace Express {
    export interface Request {
      user: User;
      reabilitator: Reabilitator;
    }
  }
}