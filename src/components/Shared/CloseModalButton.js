import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import PixelPressable from './PixelPressable';
import { connect } from 'react-redux';
import { playSound } from '../../store/soundsReducer';

const styles = StyleSheet.create({
  closeModalButton: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function CloseModalButton({ cb, wrapperStyle = {}, playSound }) {
  const handlePress = () => {
    playSound('click');
    cb()
  }
  return (
    <PixelPressable
      wrapperStyle={wrapperStyle}
      buttonStyle={{
        width: 40,
        height: 40,
      }}
      pressableProps={{
        onPress: handlePress,
        style: styles.closeModalButton
      }}
    >
      <Image
        source={require('../../images/green-x.png')}
        style={{ width: 25, height: 25 }}
      />
    </PixelPressable>
  )
}

export default connect(undefined, { playSound })(CloseModalButton);