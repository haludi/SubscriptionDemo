const requestGetOrders = "REQUEST_GET_ORDERS";
const receiveGetOrders = "RECEIVE_GET_ORDERS";
const requestCreateOrders = "REQUEST_CREATE_ORDERS";
const receiveCreateOrders = "RECEIVE_CREATE_ORDERS";
const initialState = { products: [], isLoading: false };

export const actionCreators = {
    getOrders: startIndex => async (dispatch, getState) => {
        if (startIndex === getState().orders.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestGetOrders, startIndex });
        const url = `api/Orders?startIndex=${startIndex}&amount=10`;
        const response = await fetch(url);
        const order = await response.json();
        dispatch({ type: receiveGetOrders, startIndex, order });
    },
    createOrder: productId => async (dispatch, getState) => {
        debugger;
        dispatch({ type: requestCreateOrders });
        const url = `api/Orders?productId=${productId}`;
        const rowResponse = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(productId),//TODO
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        debugger;
        const response = await rowResponse.json();
        debugger;
        dispatch({ type: receiveCreateOrders, response });
        debugger;
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === requestGetOrders) {
        return {
            ...state,
            startIndex: action.startIndex,
            isLoading: true
        };
    }
    if (action.type === receiveGetOrders) {
        return {
            ...state,
            startIndex: action.startIndex,
            products: action.products,
            isLoading: false
        };
    }
    if (action.type === requestCreateOrders) {
        debugger;
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveCreateOrders) {
        debugger;
        return {
            ...state,
            startIndex: action.startIndex,
            order: action.order,
            isLoading: false
        };
    }
    return state;
};
