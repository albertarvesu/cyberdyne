import { get } from 'lodash';

import {
  GET_ROBOTS,
  GET_ROBOTS_SUCCESS,
  GET_ROBOTS_FAILURE,
  EXTINGUISH_ROBOT,
  EXTINGUISH_ROBOT_SUCCESS,
  EXTINGUISH_ROBOT_FAILURE,
  RECYCLE_ROBOTS,
  RECYCLE_ROBOTS_SUCCESS,
  RECYCLE_ROBOTS_FAILURE,
  SHIP_ROBOTS,
  SHIP_ROBOTS_SUCCESS,
  SHIP_ROBOTS_FAILURE,
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

export const transactions = (state = initialState, action: IAppAction): IRobotAppState => {
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

    case RECYCLE_ROBOTS_SUCCESS:
      return {
        ...state,
      }


    // case GET_TRANSACTIONS:
    //   return { ...state, isFetching: true, hasError: false, error: '' };

    // case CREATE_TRANSACTION:
    //   return { ...state, isUpdating: true, hasError: false, error: '' };

    // case CREATE_TRANSACTION_SUCCESS:
    //   return { ...state, isUpdating: false, hasError: false, error: '' };

    // case GET_TRANSACTIONS_SUCCESS:
    //   return {
    //     ...state,
    //     data: action.payload,
    //     hasError: false,
    //     error: '',
    //   };

    // case GET_TRANSACTIONS_FAILURE:
    // case CREATE_TRANSACTION_FAILURE:
    //   return {
    //     ...state,
    //     isUpdating: false,
    //     hasError: true,
    //     data: undefined,
    //     error: get(action, 'payload', '')
    //   };

    default:
      return state;
  }
};

export default transactions;
