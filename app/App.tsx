import * as React from "react";
import { Provider } from "react-redux";
import { View, StatusBar } from "react-native";
import { InitialProps } from "expo/build/launch/withExpoRoot.types";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  NavigationContainer,
  RouteProp,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";

import { configureStore } from "app/store";
import { loadFonts, TextStyle } from "app/core/font";

import { Home } from "app/components/Home";
import { Cart } from "app/components/Cart";
import { Login } from "app/components/Login";
import { AddressInput } from "app/components/AddressInput";
import { CheckOut } from "app/components/CheckOut";
import { Color } from "./core/color";
import { colors } from "react-native-elements";
import { SpaceSize } from "./core/size";

const Stack = createStackNavigator();

type ScreenParam = {
  Home: {};
  Cart: {};
  Login: {};
  Address: {};
};

export type Screen<RouteName extends keyof ScreenParam> = React.FC<{
  navigation: StackNavigationProp<ScreenParam, RouteName>;
  route: RouteProp<ScreenParam, RouteName>;
}>;

export default class App extends React.Component<InitialProps> {
  state = { loading: true };
  store = null;

  async componentDidMount() {
    await loadFonts();
    this.store = await configureStore();
    this.setState({ loading: false });
  }

  render() {
    return this.state.loading ? (
      <View />
    ) : (
      <Provider store={this.store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Cart"
            mode="modal"
            screenOptions={{
              headerStyle: {
                shadowOpacity: 0,
              },
              headerBackTitleStyle: {
                ...TextStyle.Subhead,
                color: colors.primary,
              },
              headerTintColor: colors.primary,
              cardOverlayEnabled: true,
              cardShadowEnabled: true,
              headerTitleStyle: TextStyle.Body,
            }}
          >
            <Stack.Screen
              name={"Home"}
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: null,
                headerBackTitle: "Quay lại",
                ...TransitionPresets.ModalTransition,
              }}
            />
            <Stack.Screen
              name="AddressInput"
              component={AddressInput}
              options={{
                headerTitle: null,
                headerBackTitle: "Quay lại",
                ...TransitionPresets.ModalTransition,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerTitle: "Giỏ hàng",
              }}
            />
            <Stack.Screen
              name="CheckOut"
              component={CheckOut}
              options={{
                headerTitle: null,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
