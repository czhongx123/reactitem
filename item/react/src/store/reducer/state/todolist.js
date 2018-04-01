const todolist=(state=[],action)=>{
	const { type , data } =action;
	
	switch (type){

		case 'ADD_TODO_ITEM':
				return [...state,data]
			break;
		case "DEL_TODO_ITEM":
  	   			state.splice(data, 1);
      			return state;
     		break;
		default:
				return state;
			break;
	}
	
	
}
export default todolist;
