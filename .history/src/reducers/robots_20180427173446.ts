import { get } from 'lodash';

import {
  EXTINGUISH_ROBOT,
  EXTINGUISH_ROBOT_FAILURE,
  EXTINGUISH_ROBOT_SUCCESS,
  GET_ROBOTS,
  GET_ROBOTS_FAILURE,
  GET_ROBOTS_SUCCESS,
  RECYCLE_ROBOTS,
  RECYCLE_ROBOTS_FAILURE,
  RECYCLE_ROBOTS_SUCCESS,
  SHIP_ROBOTS,
  SHIP_ROBOTS_FAILURE,
  SHIP_ROBOTS_SUCCESS,
} from './../constants/actionTypes';

import { IAppAction } from '../actions';
import { IRobot, IRobotAppState, IRobotData } from './../models';

const initialState: IRobotAppState = {
  hasError: false,
  isExtinguishing: false,
  isFetching: false,
  isRecycling: false,
  isShipping: false,
};

export const robots = (state = initialState, action: IAppAction): IRobotAppState => {
  switch (action.type) {
    case GET_ROBOTS:
      return {
        ...state,
        isFetching: true,
      }

    case EXTINGUISH_ROBOT:
      return {
        ...state,
        isExtinguishing: true,
      }

    case RECYCLE_ROBOTS:
      return {
        ...state,
        isRecycling: true,
      }

    case SHIP_ROBOTS:
      return {
        ...state,
        isShipping: true,
      }

    /*
      action.payload = [IRobot]
    */
    case GET_ROBOTS_SUCCESS:
      return {
        ...state,
        data: get(action, 'payload', []).map(
          (accum: IRobotData, current: IRobot) => ({
            ...accum,
            [current.id]: current,
          }),
          get(state, 'data', {})
        ),
        isFetching: false,
      }

    /*
      action.payload = IRobot
    */
    case EXTINGUISH_ROBOT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: action.payload
        },
        isExtinguishing: false,
      }

    /*
      action.payload = [id, id, id]
    */
    case RECYCLE_ROBOTS_SUCCESS:
    case SHIP_ROBOTS_SUCCESS:
      return {
        ...state,
        data: get(Object.keys(state.data || {}), []).reduce(
                (accum: IRobotAppState, current: number) => {
                    return !action.payload.includes(current)
                      ? { ...accum, [current]: get(state, `data[${current}]`) }
                      : accum;
                  },
                {}
              ),
        isRecycling: action.type === RECYCLE_ROBOTS_SUCCESS,
        isShipping: action.type === SHIP_ROBOTS_SUCCESS,
      }

    case GET_ROBOTS_FAILURE:
    case EXTINGUISH_ROBOT_FAILURE:
    case RECYCLE_ROBOTS_FAILURE:
    case SHIP_ROBOTS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
        isExtinguishing: false,
        isFetching: false,
        isRecycling: false,
        isShipping: false,
      }

    default:
      return state;
  }
};

export default robots;
