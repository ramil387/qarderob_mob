import { Dimensions, Platform } from "react-native";

export const mainTextColor = '#303030';
export const primaryColor = '#F70F4B'
export const mainBackgroundColor = '#fff';
export const inactiveColor = '#787979';
export const blueColor = '#116BFE';

export const creamColor = '#F7F9F8';
export const f5Color = '#F5F5F5';
export const greenColor = "#00D65B";
export const redColor = "#E9100C";
export const e5Color = "#E5E5E5";
export const f3Color = "#F3F3F3";
export const f8Color = "#F8FBFC";
export const borderColor = 'rgba(0,0,0,0.5)'
export const shadowColor = 'rgba(0,0,0,0.2)'
export const disableColor = '#ccc';
export const e0Color = "#E0E0E0"
// font families

export const NunitoRegular = 'Nunito-Regular';
export const NunitoBold = 'Nunito-Bold';
export const NunitoMedium = 'Nunito-Medium';
export const NunitoSemiBold = 'Nunito-SemiBold';

export const kometaThin = 'Kometa-Thin';
export const size10 = 10;
export const size12 = 12;
export const size14 = 14;
export const size15 = 15;
export const size17 = 17;
export const size16 = 16;
export const size18 = 18;
export const size20 = 20;
export const size22 = 22;
export const size24 = 24;
export const size32 = 32;
export const padding = 16
// sizes
export const phoneWidth = Dimensions.get('screen').width;
export const phoneHeight = Dimensions.get('screen').height

export const loginBackgroundColor = "rgba(0,0,0,0.5)"

export const lgWidth = 428;
export const mdWidth = 390;
export const smWidth = 375;

export const lgHeight = 926;
export const mdHeight = 844;
export const smHeight = 667;

// snapPoints
export const firstSnapPoint = Platform.OS === 'ios' ? phoneHeight * 0.03 : phoneHeight * 0.04
export const secondSnapPoint = phoneWidth === mdWidth ? 355 : phoneWidth === smWidth ? 258 : 360
export const thirdSnapPoint = phoneHeight * 0.8



export const detailSnapPoint = 372
export const filterSnapPoint = phoneHeight * 0.7
export const searchHeaderHeightVariable = phoneHeight * 0.2 - 50
export const detailFullSnapPoint = phoneHeight - 50