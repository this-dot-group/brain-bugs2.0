import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Typography, Views } from '../../styles';
import { gray } from '../../styles/colors';
import Spinner from './Spinner';

function DropdownMenu(props) {
  const { items, selected, cb, title, loading, screenDeviceWidth } = props;
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(value || null)

  const styles = StyleSheet.create({
    title: {
      ...Typography.headingThreeText[screenDeviceWidth],
      fontFamily: 'VT323',
      textAlign: 'center'
    },
    item: {
     ...Views.dropdownItemView[screenDeviceWidth]
    },
    listItemStyle: {
      ...Typography.innerText[screenDeviceWidth],
      textAlign: 'left',
    },
    labelText: {
      ...Typography.dropdownInnerText[screenDeviceWidth],
      textAlign: 'left'
    },
    selectedItemText: {
      ...Typography.innerText[screenDeviceWidth],
      textAlign: 'left',
    }
  });

  for (let i = 0; i < items.length; i++) {
    if(i % 2) items[i].containerStyle = { backgroundColor: gray.hex }
  }

  return (
    <DropDownPicker
      style={{
        borderWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      }}
      labelStyle={styles.selectedItemText}
      listItemContainerStyle={styles.item}
      items={items}
      listItemLabelStyle={styles.listItemStyle}
      multiple={false}
      listMode="MODAL"
      open={open}
      setOpen={setOpen}
      value={value || selected}
      setValue={setValue}
      onSelectItem={cb}
      placeholder={title}
      placeholderStyle={styles.labelText}
      modalTitle={title}
      modalTitleStyle={styles.title}
      modalProps={{
        supportedOrientations: ['landscape'],
        animationType: 'slide',
      }}
      loading={loading || false}
      ActivityIndicatorComponent={Spinner}
    />
  );
}

export default DropdownMenu;
