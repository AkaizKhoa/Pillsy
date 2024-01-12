import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import SignupLogin1 from './components/SignupLogin1';
import SignupLogin2 from './components/SignupLogin2';
import SignupLogin3 from './components/SignupLogin3';
import MainScreen from './components/MainScreen';
import CustomerSupport1 from './components/CustomerSupport1';
import CustomerSupport2 from './components/CustomerSupport2';
import CustomerFeedBack1 from './components/CustomerFeedBack1';
import Scan from './components/Scan';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Scan></Scan>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
