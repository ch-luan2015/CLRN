import { connect } from "react-redux";

import { setUser } from "app/store/user/actions";
import { AppState } from "app/store";
import { Controller } from "./Controller";

const mapStateToProps = (state: AppState) => ({
  userState: state.user,
});

const mapActionToProps = { setUser };

export const AddressInput = connect(
  mapStateToProps,
  mapActionToProps
)(Controller);
