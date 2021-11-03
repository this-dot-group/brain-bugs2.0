import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chat } from '../../styles';

const styles = StyleSheet.create({
  badge: Chat.badge,
  badgeText: Chat.badgeText
})

function Badge({ children }) {
  return (
    <View
      style={styles.badge}
    >
      <Text style={styles.badgeText}>
        {children}
      </Text>
    </View>
  )
}

export default Badge;