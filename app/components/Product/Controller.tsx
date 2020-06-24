import * as React from "react";

import { addCartItem } from "app/store/cart/actions";
import { Product, ProductOption, loadProduct } from "app/resources/product";
import { ProductView } from "./View";

interface Props {
  slug: string;
  changeImage: (slug: string, image: string) => void;
  addCartItem: typeof addCartItem;
}

interface ProductState {
  product?: Product;
  selectedProduct?: Product;
  featureToOption: {
    [featureId: number]: number;
  };
  features: Product["features"];
}

interface State {
  productToState: {
    [slug: string]: ProductState;
  };
}

export class Controller extends React.Component<Props> {
  state: State = {
    productToState: {},
  };

  async componentDidUpdate(oldProps: Props) {
    if (oldProps.slug === this.props.slug) return;
    await this.initProduct(this.props.slug);
  }

  async initProduct(slug: string) {
    if (this.state.productToState[slug]) return;
    const product = await loadProduct(slug);
    if (!product.children) {
      this.setState({
        productToState: {
          ...this.state.productToState,
          [slug]: { selectedProduct: product },
        },
      });
      return;
    }

    const { options } =
      product.children.find((child) => child.is_default) || product.children[0];
    const featureToOption = product.features.reduce(
      (result, feature) => ({
        ...result,
        [feature.id]: (feature.options.find(
          (option) => options.indexOf(option.id) > -1
        ) as ProductOption).id,
      }),
      {}
    );

    const features = product.features.map((feature) => {
      const options = feature.options.filter((option) =>
        product.children.find(
          (product) => product.options.indexOf(option.id) > -1
        )
      );
      return { ...feature, options };
    });

    const selectedProduct = this.getSelectedProduct(featureToOption, product);
    this.setState((state: State) => ({
      productToState: {
        ...state.productToState,
        [slug]: { product, featureToOption, features, selectedProduct },
      },
    }));
    this.props.changeImage(selectedProduct.slug, selectedProduct.images[0]);
  }

  async componentDidMount() {
    await this.initProduct(this.props.slug);
  }

  getSelectedProduct(
    featureToOption: ProductState["featureToOption"],
    product: Product
  ) {
    const options = Object.values(featureToOption);
    const selectedChild = (product as Product).children.find((product) =>
      options.every((option) => product.options.indexOf(option) > -1)
    ) as Product;
    const selectedProduct: Product = {
      ...(product as Product),
      ...selectedChild,
    };
    return selectedProduct;
  }

  onChange = (featureId: number, selectedValue: number) => {
    const featureToOption = {
      ...this.state.productToState[this.props.slug].featureToOption,
      [featureId]: selectedValue,
    };
    const selectedProduct = this.getSelectedProduct(
      featureToOption,
      this.state.productToState[this.props.slug].product
    );
    this.setState((state: State) => ({
      productToState: {
        ...state.productToState,
        [this.props.slug]: {
          ...state.productToState[this.props.slug],
          featureToOption,
          selectedProduct,
        },
      },
    }));

    this.props.changeImage(selectedProduct.slug, selectedProduct.images[0]);
  };

  addToCart = () => {
    const productState = this.state.productToState[this.props.slug];
    const selectedProduct = this.getSelectedProduct(
      productState.featureToOption,
      productState.product
    );
    console.log("Add product", selectedProduct.id);
    this.props.addCartItem({
      product: selectedProduct,
      quantity: 1,
      updatedAt: new Date().getTime(),
    });
  };

  render() {
    const productState = this.state.productToState[this.props.slug];
    if (!productState) return null;
    return (
      <ProductView
        addToCart={this.addToCart}
        features={productState.features}
        product={productState.selectedProduct}
        onChange={this.onChange}
        featureToOption={productState.featureToOption}
      />
    );
  }
}
