const hometopten=(state=[],action)=>{
	const { type , data } =action;
	switch (type){
		case 'HOME_TOPTEN':
				return [...state,data]
			break;
		default:
				return state;
			break;
	}
	
	
}
export default hometopten;
