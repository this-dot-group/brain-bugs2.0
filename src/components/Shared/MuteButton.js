import React from 'react';
import { connect } from 'react-redux';
import { toggleMute } from '../../store/soundsReducer';
import ToggleButton from './ToggleButton';
import { Image } from 'react-native';

function MuteButton({ toggleMute, isMuted, styles }) {
  const handlePress = () => toggleMute();

  return (
    <ToggleButton
      isToggled={isMuted}
      toggle={handlePress}
      styles={styles}
      toggledText={
        <Image
          source={require('../../images/mute.png')}
          style={{ height: 20, width: 20 }} 
        />
      }
      untoggledText={
        <Image
          source={require('../../images/sound.png')}
          style={{ height: 20, width: 20 }} 
        />
      }
    />
  )
}

const mapStateToProps = ({ isMuted }) => ({ isMuted });

export default connect(mapStateToProps, { toggleMute })(MuteButton);