import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { CheckBox, Button } from "react-native-elements";

import { Color } from "../core/color";
import { Icon, IconName } from "../icons";
import { SpaceSize } from "../core/size";
import { ProductOption } from "app/resources/product";

enum Size {
  Medium = 0,
  Large = 1,
}

interface Props {
  style?: StyleProp<ViewStyle>;
  options: ProductOption[];
  value: number;
  onValueChange: (value: number) => void;
}

export class SizeCheckBox extends React.Component<Props> {
  state = { size: Size.Medium };

  render() {
    const optionsToSize = this.props.options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.slug === "medium" ? Size.Medium : Size.Large,
      }),
      {}
    );

    const iconMap = {
      [Size.Medium]: <Icon style={styles.icon} icon={IconName.SIZE_M} />,
      [Size.Large]: <Icon style={styles.icon} icon={IconName.SIZE_L} />,
    };

    const getCheckBox = (id: number) => {
      const size = optionsToSize[id];
      return () => (
        <View style={styles.checkBox}>
          {iconMap[size]}
          <CheckBox
            onPress={() => this.props.onValueChange(id)}
            checkedColor={Color.Grey8}
            checked={optionsToSize[this.props.value] === size}
          />
        </View>
      );
    };

    return (
      <View style={[this.props.style, styles.container]}>
        {this.props.options.map((option) => (
          <Button
            key={option.id}
            onPress={() => this.props.onValueChange(option.id)}
            ViewComponent={
              (getCheckBox(option.id) as unknown) as React.ComponentClass
            }
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: SpaceSize.Size4,
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  checkBox: {
    display: "flex",
    alignItems: "center",
  },
});
