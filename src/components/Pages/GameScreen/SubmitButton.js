import { View, Text, StyleSheet } from "react-native";
import { Hider, PixelPressable } from "../../Shared";
import { Typography } from "../../../styles";
import { connect } from "react-redux";
import { darkBackground, blue } from "../../../styles/colors";

const SubmitButton = ({
  showButton,
  showWaiting,
  handleAnsPress,
  displayAnswer,
  screenDeviceWidth,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '10%',
    },
    submitButton: {
      padding: 2,
      backgroundColor: darkBackground.hex,
      height: '100%',
      width: '100%',
    },
    submitText: {
      ...Typography.submitText[screenDeviceWidth]
    },
    waitingText: {
      ...Typography.waitingText[screenDeviceWidth],
    },
  });

  return (
    <View style={styles.container}>
      <Hider show={showButton}>
        <PixelPressable
          buttonStyle={{ height: 60, width: 80, position: "absolute", borderColor: blue.hex }}
          pressableProps={{
            onPress: handleAnsPress,
            onPressOut: () => {},
            style: styles.submitButton,
            disabled: displayAnswer,
          }}
        >
          <Text style={styles.submitText}>SUBMIT</Text>
        </PixelPressable>
      </Hider>
      <Hider show={showWaiting}>
        <Text style={styles.waitingText}>Waiting for other player...</Text>
      </Hider>
    </View>
  );
};

const mapStateToProps = (state) => ({
  screenDeviceWidth: state.userReducer.deviceWidth,
});

export default connect(mapStateToProps)(SubmitButton);
