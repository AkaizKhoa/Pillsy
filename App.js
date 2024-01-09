import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import SignupLogin1 from './components/SigupLogin1';
import SignupLogin2 from './components/SignupLogin2';
import SignupLogin3 from './components/SignupLogin3';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <SignupLogin3/>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
