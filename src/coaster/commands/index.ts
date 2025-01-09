import { GetCoastersListHandler } from '../queries/get-coasters.handler';
import { RegisterNewCoasterHandler } from './coaster-register/coaster-register.handler';
import { UpdateCoasterInfoHandler } from './coaster-update-info/coaster-update-info.handler';
import { DeleteWagonFromCoasterHandler } from './coaster-wagon-delete/coaster-wagon-delete.handler';
import { RegisterNewWagonCoasterHandler } from './coaster-wagon-register/coaster-wagon-register.handler';

export const CommandHandlers = [
  GetCoastersListHandler,
  RegisterNewCoasterHandler,
  RegisterNewWagonCoasterHandler,
  DeleteWagonFromCoasterHandler,
  UpdateCoasterInfoHandler,
];
