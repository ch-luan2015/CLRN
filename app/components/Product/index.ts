import { connect } from "react-redux";

import { addCartItem } from "app/store/cart/actions";
import { Controller } from "./Controller";

export const ProductDetail = connect(null, { addCartItem })(Controller);
