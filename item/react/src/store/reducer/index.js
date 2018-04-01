
import {combineReducers} from 'redux';

import homebanner2 from './state/home/homebanner2.js'
import hometopten from './state/home/hometopten.js'
import todolist from './state/todolist.js'

const reducer =combineReducers({
	todolist,
	homebanner2,
	hometopten
})
export default reducer



