import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState, saveState } from "./localStorage";
import { cartReducer } from "./cart/reducers";
import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export async function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const persistedState = await loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(middleWareEnhancer)
  );

  store.subscribe(() => {
    saveState({
      cart: store.getState().cart,
      user: store.getState().user,
    });
  });

  return store;
}
