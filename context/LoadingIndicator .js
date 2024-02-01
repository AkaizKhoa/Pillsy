import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ text }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
    <Image source={require('../assets/loading/pill-tilt-2.gif')} />
  </View>
);

LoadingIndicator.propTypes = {
  text: PropTypes.string,
};

export default LoadingIndicator;
