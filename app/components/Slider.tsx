import * as React from "react";
import * as Haptics from "expo-haptics";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import RNESlider from "react-native-slider";

import { Color } from "../core/color";
import { FontFamily, FontSize, TextStyle } from "../core/font";
import { SpaceSize, LineSize } from "../core/size";
import { ProductOption } from "app/resources/product";

interface Props {
  options: ProductOption[];
  value: number;
  onChange: (value: number) => void;
}

export function Slider(props: Props) {
  const onChange = (value: number) => {
    if (value === props.value) return;
    props.onChange(value);
    Haptics.selectionAsync();
  };

  const idToIndex = props.options.reduce(
    (acc, option, index) => ({
      ...acc,
      [option.id]: index,
    }),
    {}
  );

  const indexToId = props.options.map((option) => option.id);

  return (
    <View style={styles.container}>
      <RNESlider
        step={1}
        animateTransitions
        maximumValue={props.options.length - 1}
        minimumTrackTintColor={Color.Grey5}
        maximumTrackTintColor={Color.Grey2}
        trackStyle={styles.track}
        minimumValue={0}
        thumbTintColor={Color.Grey8}
        value={idToIndex[props.value]}
        onValueChange={(index: number) => onChange(indexToId[index])}
      />
      <View style={{ position: "relative" }}>
        {props.options.map((option, index) => {
          const unit = 100 / (props.options.length - 1);
          const left =
            index == 0
              ? 0
              : index == props.options.length - 1
              ? unit * (index - 1)
              : unit * (index - 0.5);
          const right = 100 - (left + unit);
          const alignItems =
            index == 0
              ? "flex-start"
              : index == props.options.length - 1
              ? "flex-end"
              : "center";

          const textAlign =
            index == 0
              ? "left"
              : index == props.options.length - 1
              ? "right"
              : "center";
          return (
            <View
              key={option.id}
              style={[
                styles.label,
                {
                  alignItems,
                  left: left + "%",
                  right: right + "%",
                },
              ]}
            >
              <Button
                onPress={() => onChange(indexToId[index])}
                style={styles.button}
                ViewComponent={
                  ((() => (
                    <Text style={[styles.text, { textAlign }]}>
                      {option.name}
                    </Text>
                  )) as unknown) as React.ComponentClass
                }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    position: "relative",
    ...TextStyle.Subhead,
    color: Color.Grey8,
  },

  container: {
    position: "relative",
    paddingBottom: SpaceSize.Size32,
  },

  track: {
    height: LineSize.Size2,
  },

  label: {
    position: "absolute",
    alignItems: "center",
  },

  button: {
    marginHorizontal: -SpaceSize.Size8,
    marginVertical: -SpaceSize.Size12,
    padding: SpaceSize.Size8,
  },
});
