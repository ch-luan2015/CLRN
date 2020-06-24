import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { Color } from "app/core/color";

import { Shop } from "app/components/Shop";
import { Menu } from "app/components/Menu";
import { SpaceSize } from "app/core/size";
import { Screen } from "app/App";

export const Home: Screen<"Home"> = (props) => {
  const [category, setCategory] = React.useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Menu
        selected={category}
        onChange={setCategory}
        categories={[{ name: "Đồ uống" }, { name: "Cửa hàng" }]}
      />
      {category === 0 && <Shop collectionIds={[7, 8, 9]} />}
      {category === 1 && <Shop collectionIds={[1, 2, 3]} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
});
