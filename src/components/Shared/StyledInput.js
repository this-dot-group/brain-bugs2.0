import React, { forwardRef } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { black } from '../../styles/colors'


const getStyles = style =>  StyleSheet.create({
  root: {
    borderColor: black.hex,
    borderWidth: 2,
    borderRadius: 10,
    height: '100%',
    padding: 10,
    ...style
  },
})


const StyledInput = forwardRef(function StyledInput(props, ref) {

  const styles = getStyles(props.style);

  return (
    <TextInput
      {...props}
      ref={ref}
      style={styles.root}
    />
  )
})

export default StyledInput;