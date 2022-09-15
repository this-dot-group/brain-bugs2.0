import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { gray } from '../../styles/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: scale(28),
    fontFamily: 'VT323'
  },
  item: {
    alignSelf: 'center',
    width: '80%',
    marginTop: scale(4)
  },
});

function DropdownMenu({ items, selected, cb, title }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(value || null)

  for (let i = 0; i < items.length; i++) {
    if(i % 2) items[i].containerStyle = { backgroundColor: gray.hex }
  }

  return (
    <DropDownPicker
      style={{
        borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      }}
      labelStyle={{
        fontWeight: "bold"
      }}
      listItemContainerStyle={styles.item}
      items={items}
      listItemLabelStyle={{fontFamily: 'DotGothic'}}
      multiple={false}
      listMode="MODAL"
      open={open}
      setOpen={setOpen}
      value={value || selected}
      setValue={setValue}
      onSelectItem={cb}
      placeholder={title}
      placeholderStyle={{fontFamily: 'DotGothic'}}
      modalTitle={title}
      modalTitleStyle={styles.title}
      modalProps={{
        supportedOrientations: ['landscape'],
        animationType: 'slide',
      }}
    />
  );
}

export default DropdownMenu;
