import * as React from "react";
import { StyleSheet, View } from "react-native";

import { SpaceSize } from "app/core/size";

import { Info } from "app/components/Info";
import { Slider } from "app/components/Slider";
import { SizeCheckBox } from "app/components/SizeCheckBox";
import { PtButton, ButtonColor } from "app/components/Button";

import { Product, Feature, ProductFeature } from "app/resources/product";
import { ProductOptionSelect } from "../Option";

interface Props {
  product?: Product;
  featureToOption: {
    [featureId: number]: number;
  };
  onChange: (featureId: number, selected: number) => void;
  addToCart: () => void;
  features: Product["features"];
}

export const ProductView: React.FC<Props> = (props) => {
  const slugToFeature: {
    [slug: string]: ProductFeature;
  } = props.features.reduce(
    (acc, feature) => ({
      ...acc,
      [feature.slug]: feature,
    }),
    {}
  );

  const sizeFeature = slugToFeature[Feature.SIZE];

  return props.product ? (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.name}>
          <Info
            style={styles.info}
            price={props.product.price}
            name={props.product.full_name}
            options={props.features.map((feature) =>
              feature.options.find(
                (option) => option.id === props.featureToOption[feature.id]
              )
            )}
          />

          {sizeFeature && (
            <SizeCheckBox
              options={sizeFeature.options}
              value={props.featureToOption[sizeFeature.id]}
              onValueChange={(value: number) =>
                props.onChange(sizeFeature.id, value)
              }
            />
          )}
        </View>

        {props.features.map((feature) => {
          switch (feature.slug) {
            case Feature.SIZE:
              return null;
            case Feature.SUGAR:
            case Feature.MILK:
              return (
                <Slider
                  key={feature.id}
                  value={props.featureToOption[feature.id]}
                  options={feature.options}
                  onChange={(value: number) =>
                    props.onChange(feature.id, value)
                  }
                />
              );
            default:
              return (
                <ProductOptionSelect
                  key={feature.id}
                  value={props.featureToOption[feature.id]}
                  onChange={(value: number) =>
                    props.onChange(feature.id, value)
                  }
                  options={feature.options}
                />
              );
          }
        })}
      </View>

      <PtButton
        onPress={props.addToCart}
        style={styles.button}
        icon="plus"
        title={`Chọn ${props.product.full_name?.toLowerCase()}`}
        color={ButtonColor.Primary}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: "space-between",
    padding: SpaceSize.Size24,
    paddingBottom: 0,
  },

  content: {
    // borderWidth: 1,
  },

  info: {
    flex: 1,
    flexGrow: 1,
  },

  name: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    marginTop: SpaceSize.Size12,
    // flex: 1,
  },
});
