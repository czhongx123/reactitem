const homebanner2=(state=[],action)=>{
	const { type , data } =action;
		
	
	switch (type){

		case 'HOME_BANNER2':
				return [...state,data]
			break;
		default:
				return state;
			break;
	}
	
	
}
export default homebanner2;
