import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Typography, Views } from '../../styles';
import { darkBackground, darkBackgroundLighterShade } from '../../styles/colors';
import Spinner from './Spinner';
import CloseModalButton from './CloseModalButton';
import { useSafeArea } from '../../hooks';

function DropdownMenu(props) {
  const { items, selected, cb, title, loading, screenDeviceWidth } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(value || null);
  const { width, height, top, bottom } = useSafeArea(); 

  const styles = StyleSheet.create({
    title: {
      ...Typography.headingThreeText[screenDeviceWidth],
      fontFamily: 'VT323',
      textAlign: 'center',
    },
    item: {
      ...Views.dropdownItemView[screenDeviceWidth],
    },
    listItemStyle: {
      ...Typography.innerText[screenDeviceWidth],
      textAlign: 'left',
    },
    labelText: {
      ...Typography.dropdownInnerText[screenDeviceWidth],
      textAlign: 'left',
    },
    selectedItemText: {
      ...Typography.innerText[screenDeviceWidth],
      textAlign: 'left',
    },
    modalView: {
      ...Views.modalView,
      marginTop: height * .025,
      marginBottom: height * .025,
      width: width * .95,
      maxHeight: height * .95,
    },
    searchContainerStyle: {
      ...Views.dropdownSearchContainer,
    },
  });

  for (let i = 0; i < items.length; i++) {
    if(i % 2) items[i].containerStyle = { backgroundColor: darkBackgroundLighterShade.hex }
  }

  return (
    <DropDownPicker
      style={{
        borderWidth: 0,
        backgroundColor: darkBackground.hex
      }}
      CloseIconComponent={() => <CloseModalButton cb={() => setOpen(false)} />}
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
        transparent: true,
        presentationStyle: 'overFullScreen'
      }}
      modalContentContainerStyle={{
        ...styles.modalView,
      }}
      loading={loading || false}
      ActivityIndicatorComponent={Spinner}
      searchContainerStyle={{ ...styles.searchContainerStyle }}
    />
  );
}

export default DropdownMenu;
