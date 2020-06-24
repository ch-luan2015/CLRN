import {
  CartState,
  CartActionTypes,
  DELETE_CART_ITEM,
  SET_CART_ITEM,
  EMPTY_CART,
  ADD_CART_ITEM,
  ADD_VOUCHER,
} from "./types";

const initialState: CartState = { items: {} };

export function cartReducer(
  state = initialState,
  action: CartActionTypes
): CartState {
  switch (action.type) {
    case ADD_VOUCHER:
      return {
        ...state,
        voucher: action.payload,
      };

    case ADD_CART_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.product.id]: {
            createdAt: new Date().getTime(),
            quantity: action.payload.quantity,
            product: action.payload.product,
          },
        },
      };

    case SET_CART_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.product.id]: {
            createdAt: action.payload.createdAt,
            updatedAt: new Date().getTime(),
            quantity: action.payload.quantity,
            product: action.payload.product,
          },
        },
      };

    case DELETE_CART_ITEM:
      const { product } = action.payload;
      const newState = {
        ...state,
        items: { ...state.items },
      };
      delete newState.items[product.id];
      if (Object.keys(newState.items).length === 0) {
        delete newState.voucher;
      }
      return newState;

    case EMPTY_CART:
      return initialState;

    default:
      return state;
  }
}
