import * as React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import { ProductCollection, Product } from "app/resources/product";
import { ToogleButton } from "app/components/ToggleButton";
import { SpaceSize } from "app/core/size";
import { Color } from "app/core/color";
import { FontSize, FontFamily } from "app/core/font";

interface Props {
  index?: number;
  collection: ProductCollection;
  slugToImage: {
    [slug: string]: string;
  };
  onChange: (slug: string) => void;
}

interface State {
  index: number;
}

export class Collection extends React.Component<Props> {
  state: State = {
    index: this.props.index || 0,
  };

  changeIndex = (index: number) => {
    this.setState({ index });
    this.props.onChange(this.props.collection.products[index].slug);
  };

  render() {
    const activeProduct = this.props.collection.products[this.state.index];
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri:
                this.props.slugToImage[activeProduct.slug] ||
                activeProduct.images[0],
              // cache: "only-if-cached",
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.menu}>
            {this.props.collection.products.map((product, index) => {
              return (
                <ToogleButton
                  // imageStyle={styles.imageIcon}
                  // prefix={this.props.collection.name}
                  // image={product.images[0]}
                  key={product.id}
                  title={product.name}
                  style={styles.menuItem}
                  onPress={() => this.changeIndex(index)}
                  active={index === this.state.index}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageIcon: {
    width: 50,
    height: 50,
  },

  title: {
    fontSize: FontSize.Size24,
    textAlign: "center",
    color: Color.Grey0,
    marginBottom: SpaceSize.Size12,
  },

  container: {
    position: "relative",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },

  imageContainer: {
    flex: 1,
    alignItems: "stretch",
    flexGrow: 1,
  },

  card: {
    marginVertical: SpaceSize.Size24,
    marginHorizontal: SpaceSize.Size12 / 2,
    flex: 1,
    borderRadius: 11,
    backgroundColor: Color.White,
    shadowOpacity: 0.1,
    shadowColor: Color.Grey9,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  image: {
    flex: 1,
  },

  menu: {
    justifyContent: "center",
    flexDirection: "row",
  },

  menuItem: {
    marginRight: SpaceSize.Size12,
  },

  content: {
    flex: 0,
    padding: SpaceSize.Size16,
  },
});
