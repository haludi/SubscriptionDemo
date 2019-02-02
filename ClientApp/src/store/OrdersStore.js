const requestGetOrders = "REQUEST_GET_ORDERS";
const receiveGetOrders = "RECEIVE_GET_ORDERS";
const requestCreateOrders = "REQUEST_CREATE_ORDERS";
const receiveCreateOrders = "RECEIVE_CREATE_ORDERS";
const initialState = { orders: [], isLoading: false };

export const actionCreators = {
    getOrders: startIndex => async (dispatch, getState) => {
        if (startIndex === getState().orders.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestGetOrders, startIndex });
        const url = `api/Orders?startIndex=${startIndex}&amount=10`;
        const response = await fetch(url);
        const orders = await response.json();
        debugger;
        dispatch({ type: receiveGetOrders, startIndex, orders });
    },
    createOrder: productId => async (dispatch, getState) => {
        dispatch({ type: requestCreateOrders });
        const url = `api/Orders?productId=${productId}`;
        const rowResponse = await fetch(url,
            {
                method: "POST",
                body: productId,//TODO
            });
        dispatch({ type: receiveCreateOrders, rowResponse });
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
            orders: action.orders,
            isLoading: false
        };
    }
    if (action.type === requestCreateOrders) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveCreateOrders) {
        return {
            ...state,
            startIndex: action.startIndex,
            orders: action.orders,
            isLoading: false
        };
    }
    return state;
};
