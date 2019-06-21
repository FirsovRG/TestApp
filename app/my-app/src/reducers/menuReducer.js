const initialState = {
	menuIsOpened: false
};

export default function openMenu(state = initialState, action) {
	if (action.type === 'TOGGLE_MENU') {
		let newState = state;
		newState.menuIsOpened = state.menuIsOpened ? false : true;
		return { ...newState };
	}
	return state;
};