import { connect } from "react-redux";

import { setUser } from "app/store/user/actions";
import { AppState } from "app/store";
import { Controller } from "./Controller";

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapActionToProps = { setUser };

export const Login = connect(mapStateToProps, mapActionToProps)(Controller);
