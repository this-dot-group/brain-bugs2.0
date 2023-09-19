import { Platform, SafeAreaView, View } from "react-native";

const isIos = Platform.OS === 'ios';

export default function SafeViewAllDevices(props) {
  const Component = isIos ? SafeAreaView : View;

  return <Component {...props} />
}
