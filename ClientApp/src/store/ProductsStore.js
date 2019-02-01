const requestGetProducts = "REQUEST_GET_PRODUCTS";
const receiveGetProducts = "RECEIVE_GET_PRODUCTS";
const requestCreateProducts = "REQUEST_CREATE_ORDERS";
const receiveCreateProducts = "RECEIVE_CREATE_ORDERS";
const initialState = { products: [], isLoading: false };

export const actionCreators = {
    getProducts: startIndex => async (dispatch, getState) => {
        if (startIndex === getState().products.startIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestGetProducts, startIndex });
        const url = `api/Products?startIndex=${startIndex}&amount=10`;
        const response = await fetch(url);
        const products = await response.json();
        dispatch( { type: receiveGetProducts, startIndex, products });
    },
    addProducts: product => async (dispatch, getState) => {
        dispatch({ type: requestCreateProducts });
        const url = `api/Products/${product}`;
        const rowResponse = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        debugger;
        const response = await rowResponse.json();
        debugger;
        dispatch({ type: receiveCreateProducts, response });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === requestGetProducts) {
        return {
            ...state,
            startIndex: action.startIndex,
            isLoading: true
        };
    }
    if (action.type === receiveGetProducts) {
        return {
            ...state,
            startIndex: action.startIndex,
            products: action.products,
            isLoading: false
        };
    }

    return state;
};
