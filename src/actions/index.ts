export interface IAppAction {
  type: string;
  // expected API response could be
  // IRobot[] - during fetching
  // IRobot - during extinguishing
  // number[] - during shipping and recycling
  // payload?: IRobot[] | IRobot | number[] | string;
  // doing any for now
  payload?: any;
}