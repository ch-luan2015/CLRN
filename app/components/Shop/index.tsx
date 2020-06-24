import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import { Collection } from "app/components/Collection";
import { ProductCollection, loadCollectionsByIds } from "app/resources/product";
import { SpaceSize } from "app/core/size";
import { ProductDetail } from "app/components/Product";

interface Props {
  collectionIds: number[];
}

interface State {
  loading: boolean;
  collections: ProductCollection[];
  slugToImage: {
    [slug: string]: string;
  };
  activeCollectionIndex: number;
  collectionToSlug: {
    [collectionId: number]: string;
  };
  products: {
    [slug: string]: React.ReactNode;
  };
  activeSlug?: string;
  activeProduct?: React.ReactNode;
}

export class Shop extends React.Component<Props> {
  state: State = {
    products: {},
    loading: true,
    collections: [],
    slugToImage: {},
    activeCollectionIndex: 0,
    collectionToSlug: {},
  };

  async componentDidMount() {
    const collections = await loadCollectionsByIds(this.props.collectionIds);
    const products: State["products"] = {};
    const collectionToSlug = collections.reduce(
      (acc, collection) => ({
        ...acc,
        [collection.id]: collection.products[0].slug,
      }),
      {}
    );
    const activeSlug = collections[0].products[0].slug;

    this.setState({
      loading: false,
      products,
      activeSlug,
      collections,
      collectionToSlug,
    });
  }

  changeCollection = (activeCollectionIndex: number) => {
    this.setState({ activeCollectionIndex });
  };

  changeProduct = (collectionId: number, slug: string) => {
    this.setState((state: State) => ({
      collectionToSlug: {
        ...state.collectionToSlug,
        [collectionId]: slug,
      },
    }));
  };

  changeImage = (slug: string, image: string) => {
    this.setState({
      slugToImage: {
        ...this.state.slugToImage,
        [slug]: image,
      },
    });
  };

  render() {
    if (this.state.loading) return null;
    return (
      <View style={styles.container}>
        <View style={styles.collection}>
          <Carousel
            onSnapToItem={(index) => this.changeCollection(index)}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            firstItem={this.state.activeCollectionIndex}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width - SpaceSize.Size32}
            data={this.state.collections}
            renderItem={({ item }) => (
              <Collection
                key={item.id}
                collection={item}
                slugToImage={this.state.slugToImage}
                onChange={(slug: string) => this.changeProduct(item.id, slug)}
              />
            )}
          />
        </View>

        <View style={styles.productDetail}>
          <ProductDetail
            changeImage={this.changeImage}
            slug={
              this.state.collectionToSlug[
                this.state.collections[this.state.activeCollectionIndex].id
              ]
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  productDetail: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "row",
    overflow: "hidden",
    paddingBottom: SpaceSize.Size24,
  },

  collection: {
    flex: 1,
    flexGrow: 1.2,
  },
});
