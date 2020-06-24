import { CartState } from "app/store/cart/types";

export function getTotal(cart: CartState) {
  return Object.values(cart.items).reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
}
