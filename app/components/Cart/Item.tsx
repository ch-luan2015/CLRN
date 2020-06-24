import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, colors } from "react-native-elements";

import { CartItem } from "app/store/cart/types";
import { setCartItem, deleteCartItem } from "app/store/cart/actions";

import { TextStyle } from "app/core/font";
import { Color } from "app/core/color";
import { SpaceSize } from "app/core/size";
import { formatPrice } from "app/core/price";
import { Quantity } from "app/components/Quantity";

interface Props {
  item: CartItem;
  setCartItem: typeof setCartItem;
  deleteCartItem: typeof deleteCartItem;
}

export const Item: React.FC<Props> = (props) => {
  return (
    <View style={styles.main}>
      <View style={styles.left}>
        <Image
          source={{
            uri: props.item.product.images[0],
          }}
          style={styles.image}
        />

        <Button
          type="solid"
          buttonStyle={{
            backgroundColor: null,
          }}
          titleStyle={[TextStyle.Caption1, { color: Color.Grey8 }]}
          title="Xóa"
          onPress={() => props.deleteCartItem(props.item)}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.heading}>
          <Text style={TextStyle.Body}>{props.item.product.full_name}</Text>
          <Text style={TextStyle.Subhead}>
            {formatPrice(props.item.product.price)}
          </Text>
        </View>

        <View style={styles.attributes}>
          <View style={styles.features}>
            {props.item.product.features.map((feature) => {
              const option = feature.options.find(
                (option) => props.item.product.options.indexOf(option.id) > -1
              );
              if (option.is_none) {
                return null;
              }
              const featureToIcon = {
                sugar: "cube-outline",
                milk: "water",
                "cup-size": "beaker-outline",
                package: "cube-outline",
                grind: "grain",
              };
              return (
                <View key={feature.id} style={styles.feature}>
                  <Icon
                    size={SpaceSize.Size32}
                    style={styles.icon}
                    color={Color.Grey3}
                    name={featureToIcon[feature.slug] || "plus-box-outline"}
                  />
                  <View>
                    <Text style={[TextStyle.Caption1, { color: Color.Grey8 }]}>
                      {feature.name}
                    </Text>
                    <Text style={[TextStyle.Caption1, { fontWeight: "500" }]}>
                      {option.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Quantity
            style={styles.quantity}
            value={props.item.quantity}
            setValue={(quantity) =>
              props.setCartItem({
                ...props.item,
                quantity,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    paddingVertical: SpaceSize.Size12,
    paddingRight: SpaceSize.Size16,
    paddingLeft: SpaceSize.Size8,

    borderBottomColor: Color.Grey1,
    borderBottomWidth: 1,
    // borderTopColor: Color.Grey1,
    // borderTopWidth: 1,
  },

  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: SpaceSize.Size12,
  },

  quantity: {
    marginTop: SpaceSize.Size12,
  },

  heading: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },

  image: {
    width: SpaceSize.Size64,
    height: SpaceSize.Size64,
  },

  feature: {
    marginRight: SpaceSize.Size24,
    flexDirection: "row",
    alignItems: "center",
    marginTop: SpaceSize.Size8,
  },

  icon: {
    marginRight: SpaceSize.Size4,
  },

  body: {
    flex: 1,
  },

  attributes: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
