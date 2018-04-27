import { IRobot } from '../models';
 
export interface IAppAction {
  type: string;
  payload?: IRobot[] | IRobot | string;
}