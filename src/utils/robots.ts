import { includes } from 'lodash';
import { ERobotStatus, IRobot } from '../models';

export const isForRecycling = (robot: IRobot): boolean => {
  const config = robot.configuration;

  // Has fewer than 3 or greater than 8 rotors
  const hasInCorrectNumOfRotors = config.numberOfRotors < 3 || config.numberOfRotors > 8;

  // Has any number of rotors and blue in colour
  const hasRotorsAndBlue = config.numberOfRotors > 0 && config.colour === 'blue';

  // Has both wheels and tracks
  const hasBothWheelsAndTracks = config.hasWheels && config.hasTracks;

  // Has wheels and is rusty
  const hasWheelsAndRusty = config.hasWheels && includes(robot.statuses, ERobotStatus.RUSTY);

  // Is sentient and has screws loose
  const hasSentienceAndLooseScrews = config.hasSentience && includes(robot.statuses, ERobotStatus.LOOSE_SCREWS);

  // Is on fire
  const isOnFire = includes(robot.statuses, ERobotStatus.ONFIRE);

  return [
    hasInCorrectNumOfRotors,
    hasRotorsAndBlue,
    hasBothWheelsAndTracks,
    hasWheelsAndRusty,
    hasSentienceAndLooseScrews,
    isOnFire
  ].some(check => check);
};

export const isForExtinguishing = (robot: IRobot): boolean =>
  // Sentient or on fire robots should be extinguish
  robot.configuration.hasSentience && includes(robot.statuses, ERobotStatus.ONFIRE);

export const decorateCheckbox = (robot: IRobot): object => ({
  // Robots that is ready for the next stage should have their checkbox disabled
  disabled: !isForRecycling(robot) || isForExtinguishing(robot),
});