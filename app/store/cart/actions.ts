import {
  CartItem,
  ADD_CART_ITEM,
  SET_CART_ITEM,
  DELETE_CART_ITEM,
  EMPTY_CART,
  ADD_VOUCHER,
} from "./types";

export function addCartItem(item: Omit<CartItem, "createdAt">) {
  return {
    type: ADD_CART_ITEM,
    payload: item,
  };
}

export function setCartItem(item: CartItem) {
  return {
    type: SET_CART_ITEM,
    payload: item,
  };
}

export function deleteCartItem(item: CartItem) {
  return {
    type: DELETE_CART_ITEM,
    payload: item,
  };
}

export function emptyCart() {
  return {
    type: EMPTY_CART,
  };
}

export function addVoucher(code: string) {
  return {
    type: ADD_VOUCHER,
    payload: code,
  };
}
