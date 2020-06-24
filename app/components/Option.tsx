import * as React from "react";
import * as Haptics from "expo-haptics";

import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

import { Color } from "app/core/color";
import { FontFamily, FontSize } from "app/core/font";
import { ProductOption } from "app/resources/product";
import { SpaceSize } from "app/core/size";
import { ToogleButton } from "./ToggleButton";

interface Props {
  options: ProductOption[];
  value: number;
  onChange: (value: number) => void;
}

export class ProductOptionSelect extends React.Component<Props> {
  onChange(value: number) {
    if (value === this.props.value) {
      const noneOption = this.props.options.find((option) => option.is_none);
      if (noneOption) {
        this.props.onChange(noneOption.id);
      }
      return;
    }
    this.props.onChange(value);
  }

  render() {
    const renderedOption = this.props.options.filter(
      (option) => option.is_none === false
    );
    return (
      <View
        style={[
          styles.container,
          renderedOption.length >= 3 && { justifyContent: "space-between" },
        ]}
      >
        {renderedOption.map((option) => (
          <ToogleButton
            key={option.id}
            prefix="Thêm"
            style={
              renderedOption.length < 3 && { marginRight: SpaceSize.Size12 }
            }
            onPress={() => this.onChange(option.id)}
            active={this.props.value === option.id}
            title={option.name}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamily.IBMPlexSansRegular,
    fontSize: FontSize.Size18,
    color: Color.Grey8,
    margin: 0,
    padding: 0,
  },

  wrapper: {
    padding: 0,
    backgroundColor: null,
    marginHorizontal: -SpaceSize.Size16,
    marginVertical: -SpaceSize.Size8,
  },

  container: {
    flexWrap: "wrap",
    borderColor: Color.Grey1,
    flexDirection: "row",
  },
});
