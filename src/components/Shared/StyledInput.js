import React, { forwardRef } from 'react'
import { TextInput, StyleSheet } from 'react-native'


const getStyles = style =>  StyleSheet.create({
  root: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    paddingTop: style.padding || style.paddingVertical || 10,
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