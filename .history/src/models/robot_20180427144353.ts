enum ERobotStatus {
  ONFIRE = 'on fire',
  RUSTY = 'rusty',
  LOOSE_SCREWS = 'loose screws',
  PAINT_SCRATCHED = 'paint scratched',
}

interface IRobotConfiguration {
  hasSentience: boolean;
  hasWheels: boolean;
  hasTracks: boolean;
  numberOfRotors: number;
  colour: string;
}

export interface IRobot {
  id: number;
  name: string;
  configuration: IRobotConfiguration;
  status?: ERobotStatus[];
}

export interface IRobotData {
  [key: string]: IRobot;
}

export interface IRobotAppState {
  isFetching: boolean;
  isExtinguishing: boolean;
  isRecycling: boolean;
  isShipping: boolean;
  hasError: boolean;
  data: IRobotData;
}
