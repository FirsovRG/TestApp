const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
};

export default function userActions(state = initialState, action) {
	if (action.type === 'USER_LOGIN') {
		let newState = state;
        for(let key in state){
            newState[key] = action.payload[key];
        }
		return {...newState};
	}
	return state;
};