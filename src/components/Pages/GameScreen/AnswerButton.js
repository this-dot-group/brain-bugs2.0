import { View, Text, StyleSheet } from "react-native";
import { PixelPressable } from "../../Shared";
import AnswerTheme from "./AnswerTheme.js";
import { connect } from "react-redux";
import { Typography, Buttons } from "../../../styles/index.js";

const AnswerButton = ({
  questionState,
  index,
  cb,
  disabled,
  children,
  screenDeviceWidth,
  showFinalStates,
}) => {
  const styles = StyleSheet.create({
    nonSelectedAnswer: {
      ...Buttons.nonSelectedAnswer,
    },
    buttonStyle: {
      ...Buttons.answerButton,
    },
    answerText: {
      ...Typography.answerText[screenDeviceWidth],
    },
  });

  return (
    <View
      style={{
        ...styles.answerOptionPressables,
        position: "relative",
      }}
    >
      <PixelPressable
        buttonStyle={styles.buttonStyle}
        pressableProps={{
          onPress: cb,
          style: styles.nonSelectedAnswer,
          key: index,
          disabled,
        }}
      >
        <Text style={styles.answerText}>{children}</Text>
      </PixelPressable>

      <AnswerTheme show={questionState === "selected"} variation={"selected"}>
        {children}
      </AnswerTheme>

      <AnswerTheme show={questionState === "submitted"} variation={"submitted"}>
        {children}
      </AnswerTheme>

      {showFinalStates && (
        <>
          <AnswerTheme show={questionState === "correct"} variation={"correct"}>
            {children}
          </AnswerTheme>

          <AnswerTheme
            show={questionState === "incorrect"}
            variation={"incorrect"}
          >
            {children}
          </AnswerTheme>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  screenDeviceWidth: state.userReducer.deviceWidth,
});

export default connect(mapStateToProps)(AnswerButton);
