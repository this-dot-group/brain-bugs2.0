import React from 'react';
import { Pressable, Text } from 'react-native';
import { connect } from 'react-redux';
import { toggleMute } from '../../store/soundsReducer';

function MuteButton({ toggleMute, isMuted }) {

  const handlePress = () => toggleMute();

  return (
    <Pressable
      onPress={handlePress}
    >
      <Text>
        {isMuted ? '🔕' : '🔔'}
      </Text>
    </Pressable>
  )
}

const mapStateToProps = ({ isMuted }) => ({ isMuted });

export default connect(mapStateToProps, { toggleMute })(MuteButton);