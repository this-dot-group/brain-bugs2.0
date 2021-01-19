import { StyleSheet } from 'react-native';
import { Redirect } from 'react-router-native';

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  answerPressables: {
    backgroundColor: 'grey',
    borderWidth: 3,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  selectedAnswer: {
    backgroundColor: 'orange',
    borderWidth: 3,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {

  },
  dropDownView: {
    height: 100,
  },
  dropDownPicker: {
    height: 40,
    width: 200,
  },
  dropDownItemAtt: {
    height: 50,
  },
  alertText: {
    color: 'red',
  },

});

export default styles;