import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  TextInputIOSProps,
} from "react-native";
import { Input } from "react-native-elements";
import { Color } from "app/core/color";
import { SpaceSize } from "app/core/size";
import { TextStyle } from "app/core/font";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  focus?: boolean;
  label: string;
  placeholder: string;
  value: string;
  icon?: string;
  rightIcon?: string;
  type: KeyboardTypeOptions;
  valid?: boolean;
  autoFocus?: boolean;
  postfix?: string;
  onValueChange: (value: string) => void;
  textContentType?: TextInputIOSProps["textContentType"];
  style?: StyleProp<ViewStyle>;
}

const getIconName = (valid: boolean) => {
  if (valid === true) return "check-circle";
  if (valid === false) return "alert-circle";
  return null;
};

export const PtInput: React.FC<Props> = (props) => {
  const rightIconName = getIconName(props.valid);
  const ref = React.useRef<Input>(null);
  React.useEffect(() => {
    if (props.focus) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [props.focus]);
  return (
    <View style={[style.main, props.style]}>
      <Text style={style.label}>{props.label}</Text>
      <Input
        ref={ref}
        autoFocus={props.autoFocus}
        value={props.value}
        textContentType={props.textContentType}
        keyboardType={props.type}
        keyboardAppearance="dark"
        placeholder={props.placeholder}
        onChangeText={props.onValueChange}
        placeholderTextColor={Color.Grey4}
        containerStyle={style.container}
        labelStyle={style.label}
        inputContainerStyle={style.inputContainer}
        inputStyle={style.input}
        rightIcon={
          rightIconName && (
            <Icon name={rightIconName} size={24} color={Color.Success5} />
          )
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey2,
  },

  label: {
    ...TextStyle.Body,
    lineHeight: SpaceSize.Size32,
    color: Color.Grey9,
    marginRight: SpaceSize.Size24,
  },

  container: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 0,
  },

  inputContainer: {
    padding: 0,
    borderBottomWidth: 0,
  },

  input: {
    ...TextStyle.Body,
    // backgroundColor: Color.Grey1,
    height: SpaceSize.Size32,
    paddingBottom: SpaceSize.Size2,
    color: Color.Grey9,
  },
});
