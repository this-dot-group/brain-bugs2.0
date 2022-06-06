import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Views } from '../../styles/index';
import { gray } from '../../styles/colors';

const styles = StyleSheet.create({
  root: {
    ...Views.dropDownContainer,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
  },
  contentContainer: {
  },
  item: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 8
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
      containerStyle={styles.root}
      listItemContainerStyle={styles.item}
      items={items}
      multiple={false}
      listMode="MODAL"
      open={open}
      setOpen={setOpen}
      value={value || selected}
      setValue={setValue}
      onSelectItem={cb}
      placeholder={title}
      modalTitle={title}
      modalTitleStyle={styles.title}
      modalTitleContainerStyle={styles.titleCont}
      modalContentContainerStyle={styles.contentContainer}
      modalProps={{
        supportedOrientations: ['landscape'],
        animationType: 'slide',
      }}
    />
  );
}

export default DropdownMenu;
