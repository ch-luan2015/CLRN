import { connect } from "react-redux";

import { setUser } from "app/store/user/actions";
import { AppState } from "app/store";
import { Controller } from "./Controller";

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

const mapActionToProps = { setUser };

export const OrderOverview = connect(
  mapStateToProps,
  mapActionToProps
)(Controller);
