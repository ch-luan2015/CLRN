import * as Font from "expo-font";
import { StyleSheet } from "react-native";
import { Color } from "./color";
import { normalize } from "./scale";

export enum FontFamily {
  IBMPlexSansBold = "IBMPlexSansBold",
  IBMPlexSansBoldItalic = "IBMPlexSansBoldItalic",
  IBMPlexSansExtraLight = "IBMPlexSansExtraLight",
  IBMPlexSansExtraLightItalic = "IBMPlexSansExtraLightItalic",
  IBMPlexSansItalic = "IBMPlexSansItalic",
  IBMPlexSansLight = "IBMPlexSansLight",
  IBMPlexSansLightItalic = "IBMPlexSansLightItalic",
  IBMPlexSansMedium = "IBMPlexSansMedium",
  IBMPlexSansMediumItalic = "IBMPlexSansMediumItalic",
  IBMPlexSansRegular = "IBMPlexSansRegular",
  IBMPlexSansSemiBold = "IBMPlexSansSemiBold",
  IBMPlexSansSemiBoldItalic = "IBMPlexSansSemiBoldItalic",
  IBMPlexSansThin = "IBMPlexSansThin",
  IBMPlexSansThinItalic = "IBMPlexSansThinItalic",
  IBMPlexSansCondensedBold = "IBMPlexSansCondensedBold",
  IBMPlexSansCondensedBoldItalic = "IBMPlexSansCondensedBoldItalic",
  IBMPlexSansCondensedExtraLight = "IBMPlexSansCondensedExtraLight",
  IBMPlexSansCondensedExtraLightItalic = "IBMPlexSansCondensedExtraLightItalic",
  IBMPlexSansCondensedItalic = "IBMPlexSansCondensedItalic",
  IBMPlexSansCondensedLight = "IBMPlexSansCondensedLight",
  IBMPlexSansCondensedLightItalic = "IBMPlexSansCondensedLightItalic",
  IBMPlexSansCondensedMedium = "IBMPlexSansCondensedMedium",
  IBMPlexSansCondensedMediumItalic = "IBMPlexSansCondensedMediumItalic",
  IBMPlexSansCondensedRegular = "IBMPlexSansCondensedRegular",
  IBMPlexSansCondensedSemiBold = "IBMPlexSansCondensedSemiBold",
  IBMPlexSansCondensedSemiBoldItalic = "IBMPlexSansCondensedSemiBoldItalic",
  IBMPlexSansCondensedThin = "IBMPlexSansCondensedThin",
  IBMPlexSansCondensedThinItalic = "IBMPlexSansCondensedThinItalic",
}

export async function loadFonts() {
  await Font.loadAsync({
    [FontFamily.IBMPlexSansBold]: require("../../assets/fonts/IBMPlexSans-Bold.ttf"),
    [FontFamily.IBMPlexSansBoldItalic]: require("../../assets/fonts/IBMPlexSans-BoldItalic.ttf"),
    [FontFamily.IBMPlexSansExtraLight]: require("../../assets/fonts/IBMPlexSans-ExtraLight.ttf"),
    [FontFamily.IBMPlexSansExtraLightItalic]: require("../../assets/fonts/IBMPlexSans-ExtraLightItalic.ttf"),
    [FontFamily.IBMPlexSansItalic]: require("../../assets/fonts/IBMPlexSans-Italic.ttf"),
    [FontFamily.IBMPlexSansLight]: require("../../assets/fonts/IBMPlexSans-Light.ttf"),
    [FontFamily.IBMPlexSansLightItalic]: require("../../assets/fonts/IBMPlexSans-LightItalic.ttf"),
    [FontFamily.IBMPlexSansMedium]: require("../../assets/fonts/IBMPlexSans-Medium.ttf"),
    [FontFamily.IBMPlexSansMediumItalic]: require("../../assets/fonts/IBMPlexSans-MediumItalic.ttf"),
    [FontFamily.IBMPlexSansRegular]: require("../../assets/fonts/IBMPlexSans-Regular.ttf"),
    [FontFamily.IBMPlexSansSemiBold]: require("../../assets/fonts/IBMPlexSans-SemiBold.ttf"),
    [FontFamily.IBMPlexSansSemiBoldItalic]: require("../../assets/fonts/IBMPlexSans-SemiBoldItalic.ttf"),
    [FontFamily.IBMPlexSansThin]: require("../../assets/fonts/IBMPlexSans-Thin.ttf"),
    [FontFamily.IBMPlexSansThinItalic]: require("../../assets/fonts/IBMPlexSans-ThinItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedBold]: require("../../assets/fonts/IBMPlexSansCondensed-Bold.ttf"),
    [FontFamily.IBMPlexSansCondensedBoldItalic]: require("../../assets/fonts/IBMPlexSansCondensed-BoldItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedExtraLight]: require("../../assets/fonts/IBMPlexSansCondensed-ExtraLight.ttf"),
    [FontFamily.IBMPlexSansCondensedExtraLightItalic]: require("../../assets/fonts/IBMPlexSansCondensed-ExtraLightItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedItalic]: require("../../assets/fonts/IBMPlexSansCondensed-Italic.ttf"),
    [FontFamily.IBMPlexSansCondensedLight]: require("../../assets/fonts/IBMPlexSansCondensed-Light.ttf"),
    [FontFamily.IBMPlexSansCondensedLightItalic]: require("../../assets/fonts/IBMPlexSansCondensed-LightItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedMedium]: require("../../assets/fonts/IBMPlexSansCondensed-Medium.ttf"),
    [FontFamily.IBMPlexSansCondensedMediumItalic]: require("../../assets/fonts/IBMPlexSansCondensed-MediumItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedRegular]: require("../../assets/fonts/IBMPlexSansCondensed-Regular.ttf"),
    [FontFamily.IBMPlexSansCondensedSemiBold]: require("../../assets/fonts/IBMPlexSansCondensed-SemiBold.ttf"),
    [FontFamily.IBMPlexSansCondensedSemiBoldItalic]: require("../../assets/fonts/IBMPlexSansCondensed-SemiBoldItalic.ttf"),
    [FontFamily.IBMPlexSansCondensedThin]: require("../../assets/fonts/IBMPlexSansCondensed-Thin.ttf"),
    [FontFamily.IBMPlexSansCondensedThinItalic]: require("../../assets/fonts/IBMPlexSansCondensed-ThinItalic.ttf"),
  });
}

export const FontSize = {
  Size16: 16,
  Size18: 18,
  Size24: 24,
};

export const TextStyle = StyleSheet.create({
  LargeTitle: {
    color: Color.Grey9,
    // fontFamily: FontFamily.IBMPlexSansCondensedRegular,
    fontWeight: "600",
    fontSize: normalize(34),
    lineHeight: normalize(41),
  },

  Title1: {
    color: Color.Grey9,
    // // fontFamily: FontFamily.IBMPlexSansMedium,
    fontSize: normalize(28),
    lineHeight: normalize(34),
  },

  Title2: {
    color: Color.Grey9,
    fontSize: normalize(22),
    lineHeight: normalize(28),
  },

  Title3: {
    color: Color.Grey9,
    fontSize: normalize(20),
    lineHeight: normalize(25),
  },

  Heading: {
    color: Color.Grey9,
    // // fontFamily: FontFamily.IBMPlexSansSemiBold,
    fontWeight: "500",
    fontSize: normalize(17),
    lineHeight: normalize(22),
  },

  Body: {
    color: Color.Grey9,
    // fontFamily: FontFamily.IBMPlexSansRegular,
    fontSize: normalize(17),
    lineHeight: normalize(22),
  },

  Callout: {
    color: Color.Grey9,
    fontSize: normalize(16),
    lineHeight: normalize(21),
  },

  Subhead: {
    color: Color.Grey9,
    // fontFamily: FontFamily.IBMPlexSansRegular,
    fontSize: normalize(15),
    lineHeight: normalize(20),
  },

  Footnote: {
    color: Color.Grey9,
    fontSize: normalize(13),
    lineHeight: normalize(18),
  },

  Caption1: {
    color: Color.Grey9,
    fontSize: normalize(12),
    lineHeight: normalize(16),
  },

  Caption2: {
    color: Color.Grey9,
    fontSize: normalize(11),
    lineHeight: normalize(13),
  },
});
