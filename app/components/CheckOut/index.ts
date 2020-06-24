import { connect } from "react-redux";

import { AppState } from "app/store";
import { Controller } from "./Controller";

const mapStateToProps = (state: AppState) => ({
  token: state.user?.info?.token,
});

export const CheckOut = connect(mapStateToProps)(Controller);
