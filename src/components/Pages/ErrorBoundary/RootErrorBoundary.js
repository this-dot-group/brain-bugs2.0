import { ErrorBoundary } from 'react-error-boundary';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '../../../styles';
import { brightRed } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  heading: {
    ...Typography.headingOneText.small,
    color: brightRed.hex
  },
  content: {
    ...Typography.innerText.small,
    color: brightRed.hex
  },
});

export function RootErrorFallback() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Something went wrong...</Text>
        <Text style={styles.content}>Sometimes our brain has bugs. Please restart the app.</Text>
      </View>
    </View>
  );
}

export default function RootErrorBoundary({ children }) {
  const handleError = (e) => {
    console.log(e);
  };

  return (
    <ErrorBoundary fallback={<RootErrorFallback />} onReset={handleError}>
      {children}
    </ErrorBoundary>
  );
}
