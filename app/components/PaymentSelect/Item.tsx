import * as React from "react";
import { View, StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import { Button } from "react-native-elements";
import { SpaceSize } from "app/core/size";
import { Color } from "app/core/color";
import { PaymentOption } from "app/resources/payment";
import { TextStyle } from "app/core/font";

interface Props {
  option: PaymentOption;
  checked: boolean;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const PaymentItem: React.FC<Props> = (props) => {
  return (
    <Button
      onPress={props.onPress}
      disabled={props.option.disabled}
      ViewComponent={
        ((() => (
          <View
            style={[
              styles.main,
              props.checked ? styles.checked : styles.unchecked,
              props.option.disabled && styles.disabled,
              props.style,
            ]}
          >
            <Text style={styles.label}>{props.option.label}</Text>
            <Text style={styles.description}>{props.option.description}</Text>
            {props.option.helperText && (
              <Text style={styles.helperText}>{props.option.helperText}</Text>
            )}
          </View>
        )) as unknown) as React.ComponentClass
      }
    />
  );
};

const styles = StyleSheet.create({
  checked: {
    borderColor: Color.Primary6,
    backgroundColor: Color.Primary1,
  },
  unchecked: {
    borderColor: Color.Grey2,
  },
  main: {
    padding: SpaceSize.Size12,
    borderWidth: 1,
    borderRadius: 5,
  },

  label: {
    ...TextStyle.Body,
  },
  description: {
    ...TextStyle.Subhead,
    color: Color.Grey8,
  },
  helperText: {
    ...TextStyle.Subhead,
    color: Color.Grey8,
  },
  disabled: {
    backgroundColor: Color.Grey1,
    opacity: 0.6,
    borderColor: "transparent",
  },
});
