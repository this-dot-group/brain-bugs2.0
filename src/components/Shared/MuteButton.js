import React from 'react';
import { connect } from 'react-redux';
import { toggleMute } from '../../store/soundsReducer';
import ToggleButton from './ToggleButton';

function MuteButton({ toggleMute, isMuted, styles }) {
  const handlePress = () => toggleMute();

  return (
    <ToggleButton
      isToggled={isMuted}
      toggle={handlePress}
      styles={styles}
      toggledText={'🔕'}
      untoggledText={'🔔'}
    />
  )
}

const mapStateToProps = ({ isMuted }) => ({ isMuted });

export default connect(mapStateToProps, { toggleMute })(MuteButton);