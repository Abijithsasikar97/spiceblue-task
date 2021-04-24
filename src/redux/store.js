import {createStore,applyMiddleware} from 'redux';
import { logger } from 'redux-logger';
import { addTask } from './reducer/addTask';

export const store = createStore(addTask,applyMiddleware(logger))