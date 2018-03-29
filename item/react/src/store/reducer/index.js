
import {combineReducers} from 'redux';

import homebanner from './state/home/homebanner.js'
import todolist from './state/todolist.js'

const reducer =combineReducers({
	homebanner,
	todolist
})
export default reducer



