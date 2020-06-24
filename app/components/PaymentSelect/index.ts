import { connect } from "react-redux";

import { setCartItem, deleteCartItem } from "app/store/cart/actions";
import { AppState } from "app/store";
import { Controller } from "./Controller";

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

export const PaymentSelect = connect(mapStateToProps, {
  setCartItem,
  deleteCartItem,
})(Controller);
