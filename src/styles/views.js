import { brightGreen, darkBackground, black } from "./colors";

export const safeAreaContainer = {
  flex: 1,
  backgroundColor: black.hex,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

export const modalView = {
  backgroundColor: darkBackground.hex,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: brightGreen.hex,
  padding: 10,
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',
  marginBottom: 'auto',
  alignSelf: 'center',
  width: '95%',
  height: '95%'
};

/// DROPDOWN LIST OPTION CONTAINER //
//// - start game option lists //////

const baseDropdownItemView = {
  alignSelf: 'center',
  width: '80%',
  backgroundColor: darkBackground.hex
}

export const dropdownItemView = {
  small: {
    ...baseDropdownItemView,
    height: 40
  },
  medium: {
    ...baseDropdownItemView,
    height: 50
  },
  large: {
    ...baseDropdownItemView,
    height: 60
  }
}

export const dropdownSearchContainer = {
  borderBottomColor: brightGreen.hex,
  borderBottomWidth: 2,
}

export const homeScreenContainer = {
  flex: 1,
  paddingTop: 30,
  paddingBottom: 30,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}

export const bottomNestedRowView = {
  flexDirection: 'row',
  width: '90%',
  alignItems: 'center',
  justifyContent: 'space-between',
}

