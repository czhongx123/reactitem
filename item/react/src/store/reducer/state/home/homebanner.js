const homebanner=(state=[],action)=>{
	const { type , data } =action;
	switch (type){
		case 'GET_BANNER':
				return [...state,data]
			break;
		default:
				return state;
			break;
	}
	
	
}
export default homebanner;
