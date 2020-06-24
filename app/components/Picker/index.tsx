import * as React from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Color } from "app/core/color";

interface Props {
  options: {
    label: string;
    value: number;
  }[];
  selected: number;
  onChange: (selected: number) => void;
}

export const PtPicker: React.FC<Props> = (props) => {
  return (
    <View style={styles.main}>
      <Picker
        style={styles.picker}
        onValueChange={(item) => props.onChange(item)}
        selectedValue={props.selected}
      >
        {props.options.map((option) => (
          <Picker.Item value={option.value} label={option.label} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.Grey2,
  },

  picker: {
    width: "100%",
  },
});
