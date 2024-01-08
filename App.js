import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignupLogin1 from './components/SigupLogin1';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignupLogin1></SignupLogin1>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
