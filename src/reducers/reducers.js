const initialState = {
    korpa: []
}

const korpaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DODAJ_PRODUKT':
            return { ...state, korpa: [...state.korpa, {item: action.payload, id: action._id}] };
        case 'UKLONI_PRODUKT':
            return { ...state, korpa: state.korpa.filter(item => item.id !== action._id) };
        case 'ISPRAZNI':
            return {...state, korpa: []}
        default:
            return state;
    }
}

export default korpaReducer;
