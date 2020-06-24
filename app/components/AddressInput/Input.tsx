import * as React from "react";
import { View, StyleSheet, Dimensions, Picker, Alert } from "react-native";
import {
  loadAddressSuggestion,
  AddressPart,
  createAddress,
} from "app/resources/address";
import Icon from "react-native-vector-icons/Feather";

import { Button, Input } from "react-native-elements";
import { SpaceSize } from "app/core/size";
import { PtPicker } from "../Picker";
import { Color } from "app/core/color";
import { TextStyle } from "app/core/font";
import Carousel from "react-native-snap-carousel";
import { PtInput } from "app/components/PtInput";
import { PtButton, ButtonColor } from "../Button";
import { User } from "app/resources/user";
import { useNavigation } from "@react-navigation/native";

interface Props {
  user: User;
}

enum PickerType {
  Province,
  District,
  Ward,
}

export const AddressInput: React.FC<Props> = (props) => {
  const carousel = React.useRef(null);
  const navigation = useNavigation();

  const [provinces, setProvinces] = React.useState<AddressPart[]>([]);
  const [districts, setDistricts] = React.useState<AddressPart[]>([]);
  const [wards, setWards] = React.useState<AddressPart[]>([]);

  const [provinceID, setProvinceID] = React.useState<number | null>();
  const [districtID, setDistrictID] = React.useState<number | null>();
  const [wardID, setWardID] = React.useState<number | null>();

  const [pendingProvinceID, setPendingProvinceID] = React.useState(79);
  const [pendingDistrictID, setPendingDistrictID] = React.useState<number>(
    null
  );
  const [pendingWardID, setPendingWardID] = React.useState<number>(null);

  const [street, setStreet] = React.useState("");
  const [recipient, setRecipient] = React.useState(props.user.name);

  const [inputFocus, setInputFocus] = React.useState(false);

  const [picker, setPicker] = React.useState<PickerType | null>(null);
  const togglePicker = (type: PickerType) => {
    if (picker === type) {
      setPicker(null);
      return;
    }

    setInputFocus(false);
    switch (type) {
      case PickerType.Province:
        setPicker(type);
      case PickerType.District:
        if (provinceID !== null) setPicker(type);
      case PickerType.Ward:
        if (districtID !== null) setPicker(type);
    }
  };

  React.useEffect(() => {
    async function suggest() {
      const { provinces } = await loadAddressSuggestion(props.user.token, {});
      setProvinces(provinces);
    }
    suggest();
  }, []);

  React.useEffect(() => {
    async function suggest() {
      if (!provinceID) return;
      const { districts } = await loadAddressSuggestion(props.user.token, {
        provinceId: provinceID,
      });
      setDistricts(districts);
      setDistrictID(null);
      setPendingWardID(null);
      setPendingDistrictID(districts[0].id);
    }
    suggest();
  }, [provinceID]);

  React.useEffect(() => {
    async function suggest() {
      setWardID(null);
      if (!districtID) return;
      const { wards } = await loadAddressSuggestion(props.user.token, {
        provinceId: provinceID,
        districtId: districtID,
      });
      setWards(wards);
      setPendingWardID(wards[0].id);
    }
    suggest();
  }, [districtID]);

  const pickerTypes = [
    PickerType.Province,
    PickerType.District,
    PickerType.Ward,
  ];

  React.useEffect(() => {
    if (picker === null) return;
    carousel.current.snapToItem(pickerTypes.indexOf(picker));
  }, [picker]);

  const next = () => {
    switch (picker) {
      case null:
        return;

      case PickerType.Province:
        if (!pendingProvinceID) return;
        setProvinceID(pendingProvinceID);
        break;

      case PickerType.District:
        if (!pendingDistrictID) return;
        setDistrictID(pendingDistrictID);
        break;

      case PickerType.Ward:
        setWardID(pendingWardID);
        setPicker(null);
        setInputFocus(true);
        return;
    }
    setPicker(pickerTypes[pickerTypes.indexOf(picker) + 1]);
  };

  const back = () => {
    switch (picker) {
      case null:
      case PickerType.Province:
        return;
      default:
        setPicker(pickerTypes[pickerTypes.indexOf(picker) - 1]);
    }
  };

  const submit = async () => {
    if (!wardID) {
      Alert.alert(
        "Địa chỉ chưa đầy đủ",
        `Bạn cần chọn ${provinceID ? "" : "tỉnh thành phố,"} ${
          districtID ? "" : "quận huyện và"
        } phường xã`,
        [
          {
            text: "Đồng ý",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }

    if (street.length < 5) {
      Alert.alert(
        "Địa chỉ chưa đầy đủ",
        "Bạn cần nhập chi tiết số nhà và tên đường",
        [
          {
            text: "Đồng ý",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }

    await createAddress(props.user.token, {
      street,
      phone: props.user.phone,
      ward_id: wardID,
      recipient: "",
      description: "",
    });

    navigation.goBack();
  };

  const placeholder = {
    [PickerType.Province]: "Chọn tỉnh/thành phố",
    [PickerType.District]: "Chọn quận/huyện",
    [PickerType.Ward]: "Chọn phường/xã",
  };

  const items = {
    [PickerType.Province]: provinces,
    [PickerType.District]: districts,
    [PickerType.Ward]: wards,
  };

  const selectedID = {
    [PickerType.Province]: provinceID,
    [PickerType.District]: districtID,
    [PickerType.Ward]: wardID,
  };

  const selectedPendingID = {
    [PickerType.Province]: pendingProvinceID,
    [PickerType.District]: pendingDistrictID,
    [PickerType.Ward]: pendingWardID,
  };

  const setPendingSelected = {
    [PickerType.Province]: setPendingProvinceID,
    [PickerType.District]: setPendingDistrictID,
    [PickerType.Ward]: setPendingWardID,
  };

  return (
    <View style={styles.main}>
      <View style={styles.body}>
        {wardID && (
          <>
            <PtInput
              focus={inputFocus}
              style={{ marginBottom: SpaceSize.Size6 }}
              label="Người nhận"
              placeholder="Nhập tên người nhận"
              type="default"
              textContentType="name"
              value={recipient}
              onValueChange={setRecipient}
            />

            <PtInput
              style={{ marginBottom: SpaceSize.Size12 }}
              label="Địa chỉ"
              placeholder="Nhập số nhà, tên đường"
              type="numbers-and-punctuation"
              textContentType="streetAddressLine1"
              value={street}
              onValueChange={setStreet}
            />
          </>
        )}
        {[PickerType.Province, PickerType.District, PickerType.Ward]
          .reverse()
          .map((type) => {
            const selectedItem = items[type]?.find(
              (item) => item.id === selectedID[type]
            );
            return (
              selectedPendingID[type] && (
                <Button
                  key={type}
                  iconRight
                  onPress={() => togglePicker(type)}
                  title={selectedItem ? selectedItem.name : placeholder[type]}
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonContainer}
                  titleStyle={[
                    styles.buttonTitle,
                    selectedItem
                      ? { color: Color.Grey9 }
                      : { color: Color.Grey8 },
                  ]}
                  icon={
                    <Icon
                      name="chevron-down"
                      color={Color.Grey9}
                      size={SpaceSize.Size24}
                    />
                  }
                />
              )
            );
          })}

        {wardID && (
          <PtButton
            onPress={submit}
            title="Đồng ý"
            color={ButtonColor.Primary}
          />
        )}
      </View>

      {provinces && (
        <View style={picker === null && { display: "none" }}>
          <View style={styles.heading}>
            <Button
              containerStyle={styles.navButton}
              onPress={back}
              type="clear"
              title="Quay lại"
              titleStyle={[TextStyle.Body, { color: Color.Grey9 }]}
              icon={
                <Icon
                  name="chevron-left"
                  size={SpaceSize.Size24}
                  color={Color.Grey9}
                />
              }
            />
            <Button
              containerStyle={styles.navButton}
              onPress={next}
              type="clear"
              title="Tiếp tục"
              titleStyle={[TextStyle.Body, { color: Color.Grey9 }]}
              icon={
                <Icon
                  name="chevron-right"
                  size={SpaceSize.Size24}
                  color={Color.Grey9}
                />
              }
              iconRight={true}
            />
          </View>

          <Carousel
            ref={carousel}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            data={pickerTypes}
            scrollEnabled={false}
            renderItem={({ item: picker }) =>
              items[picker] !== null && (
                <PtPicker
                  selected={selectedPendingID[picker]}
                  onChange={setPendingSelected[picker]}
                  options={items[picker].map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              )
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: SpaceSize.Size24,
  },

  navButton: {
    paddingVertical: SpaceSize.Size6,
  },

  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Color.Grey2,
  },

  button: {
    backgroundColor: Color.Grey1,
    alignContent: "space-between",
    justifyContent: "space-between",
    padding: SpaceSize.Size8,
  },

  buttonContainer: {
    marginBottom: SpaceSize.Size12,
  },

  buttonTitle: {
    ...TextStyle.Body,
    color: Color.Grey8,
  },

  main: {
    flex: 1,
    position: "relative",
    width: "100%",
    backgroundColor: Color.White,
  },
});
