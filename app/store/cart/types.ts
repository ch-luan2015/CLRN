import { Product } from "app/resources/product";

export interface CartItem {
  product: Product;
  quantity: number;
  createdAt: number;
  updatedAt?: number;
}

export interface CartState {
  items: {
    [productId: number]: CartItem;
  };
  voucher?: string;
}

export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const SET_CART_ITEM = "SET_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const EMPTY_CART = "EMPTY_CART";
export const ADD_VOUCHER = "ADD_VOUCHER";

interface AddVoucherAction {
  type: typeof ADD_VOUCHER;
  payload: string;
}

interface AddCartItemAction {
  type: typeof ADD_CART_ITEM;
  payload: CartItem;
}

interface SetCartItemAction {
  type: typeof SET_CART_ITEM;
  payload: CartItem;
}

interface DeleteCartItemAction {
  type: typeof DELETE_CART_ITEM;
  payload: CartItem;
}

interface EmptyCartAction {
  type: typeof EMPTY_CART;
}

export type CartActionTypes =
  | SetCartItemAction
  | DeleteCartItemAction
  | EmptyCartAction
  | AddCartItemAction
  | AddVoucherAction;
