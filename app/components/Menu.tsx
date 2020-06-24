import * as React from "react";
import { View, StyleSheet } from "react-native";

import { SpaceSize } from "app/core/size";
import { ToogleButton } from "app/components/ToggleButton";

interface Category {
  name: string;
  icon?: string;
}

interface Props {
  selected: number;
  onChange: (selected: number) => void;

  categories: Category[];
}

export const Menu: React.FC<Props> = (props) => {
  const [selected, setSelected] = React.useState(props.selected);
  const change = (value: number) => {
    props.onChange(value);
    setSelected(value);
  };
  return (
    <View style={styles.container}>
      <ToogleButton style={styles.button} icon="menu" />
      {props.categories.map((category, index) => (
        <ToogleButton
          key={category.name}
          onPress={() => change(index)}
          active={selected === index}
          style={styles.button}
          title={category.name}
          icon={category.icon}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SpaceSize.Size24,
    paddingTop: SpaceSize.Size12,
  },

  button: {
    marginRight: SpaceSize.Size12,
  },
});
