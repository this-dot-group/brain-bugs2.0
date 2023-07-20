import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { MuteButton, ToggleButton, PixelButton, Overlay } from '../Shared';
import StatsModal from '../StatsModal/StatsModal';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal';
import { playSound } from '../../store/soundsReducer';
import { connect } from 'react-redux';
import { Buttons } from '../../styles';

const SettingsDrawer = ({ screenDeviceWidth, playSound }) => {
  if (!screenDeviceWidth) return <></>;
  const styles = StyleSheet.create({
    root: {
      top: 0,
      left: 0,
      bottom: 0,
      right: -8,
      position: 'absolute',
      paddingVertical: 30,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    drawer: {
      ...Buttons.settingsDrawer[screenDeviceWidth],
    },
    drawerInner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingRight: 6,
    },
    innerButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    innerButton: {
      fontSize: 90,
      padding: 8,
    }
  });

  const [open, setOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [howToPlayVisibile, setHowToPlayVisible] = useState(false);

  const rightTranslate = Buttons.settingsDrawer[screenDeviceWidth].width - 36;
  const translateXVal = useRef(new Animated.Value(rightTranslate)).current;

  const translateAnim = (toValue) => () => {
    Animated.spring(translateXVal, {
      toValue,
      speed: 20,
      bounciness: 1,
      useNativeDriver: true,
    }).start();
  };

  const right = translateAnim(rightTranslate);

  const left = translateAnim(0);

  const handlePress = () => {
    playSound('click');
    if (open) {
      setOpen(false);
      right();
      return;
    }
    setOpen(true);
    left();
  };

  const modalHandler = func => () => {
    playSound('click');
    func(true);
  }

  const handleStats = modalHandler(setStatsVisible);
  
  const handleHowToPlay = modalHandler(setHowToPlayVisible);

  return (
    <View
      style={styles.root}
      pointerEvents={'box-none'}
      onPointerDown={handlePress}
      onPointerDownCapture={handlePress}
    >
      <Overlay
        active={open}
        onPress={handlePress}
      />
      <Animated.View
        style={{
          transform: [
            {
              translateX: translateXVal,
            },
          ],
          zIndex: 2,
        }}
      >
        <PixelButton buttonStyle={styles.drawer}>
          <View style={styles.drawerInner}>
            <ToggleButton
              toggle={handlePress}
              isToggled={open}
              untoggledText={'⚙️'}
              toggledText={'❌'}
              styles={styles.innerButton}
            />
            <View style={styles.innerButtons}>
              <ToggleButton
                toggle={handleStats}
                isToggled={statsVisible}
                untoggledText={'📊'}
                toggledText={'📊'}
                styles={styles.innerButton}
              />
              <ToggleButton
                toggle={handleHowToPlay}
                isToggled={howToPlayVisibile}
                untoggledText={'❓'}
                toggledText={'❓'}
                styles={styles.innerButton}
              />
              <MuteButton styles={styles.innerButton}/>
            </View>
          </View>
        </PixelButton>
      </Animated.View>
      <StatsModal
        visible={statsVisible}
        setVisible={setStatsVisible}
        deviceSize={screenDeviceWidth}
      />
      <HowToPlayModal
        visible={howToPlayVisibile}
        setVisible={setHowToPlayVisible}
        deviceSize={screenDeviceWidth}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  screenDeviceWidth: state.userReducer.deviceWidth,
});

export default connect(mapStateToProps, { playSound })(SettingsDrawer);
