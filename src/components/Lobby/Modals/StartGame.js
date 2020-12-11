import React, { useEffect } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import styles from '../../../styles/styles';


function StartGame(props) {

  useEffect(() => {
    // api call 
  }, [])

  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'start'}
    >
      <View
        style={styles.modalView}
      >
        <Text>Start a game here!!</Text>
        <Pressable
          style={styles.openButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
        <View style={{height: 200}}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}
            // defaultValue='category 1'
            
            multiple={false}
            placeholder='Select a Category'
            itemStyle={{ height: 50 }}
            items={[
              { label: 'category 99', value: 'category 99' },
              { label: 'category 2', value: 'category 2' },
              { label: 'category 3', value: 'category 3' },
              { label: 'category 4', value: 'category 4' },
              { label: 'category 5', value: 'category 5' },
              { label: 'category 6', value: 'category 6' },
              { label: 'category 7', value: 'category 7' },
              { label: 'category 8', value: 'category 8' },
              { label: 'category 9', value: 'category 9' },
              { label: 'category 10', value: 'category 10' },
              { label: 'category 11', value: 'category 11' },
              { label: 'category 12', value: 'category 12' },
              { label: 'category 13', value: 'category 13' },

            ]}
          />

        </View>
        <View style={{height: 200}}>
        <DropDownPicker
          containerStyle={{ height: 40, width: 200 }}
          // defaultValue={10}
          placeholder='Number of Questions'
          multiple={false}
          items={[
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '20', value: 20 },
            { label: '25', value: 25 },
          ]}
        />
        </View>
        <View style={{height: 200}}>
        <DropDownPicker
          containerStyle={{ height: 40, width: 200 }}
          // defaultValue={'Two Players'}
          placeholder='Number of Players'
          multiple={false}
          items={[
            { label: 'Single Player', value: 'Single Player' },
            { label: 'Two Players', value: 'Two Players' }
          ]}
        />

        </View>

      </View>
    </Modal>
  )
}

export default StartGame
