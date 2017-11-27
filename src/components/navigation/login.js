import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo';
import FacebookLogin from '../common/facebook-login';

const styles = StyleSheet.create({
  box: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    flex: 5.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  boxButton: {
    flex: 4.5,
    justifyContent: 'center',
  },
  image: {
    flex: 0.5,
    resizeMode: 'contain',
  },
});

// const sagaMiddleware = createSagaMiddleware();

export default class Login extends React.Component {
  state = {
    userInfo: null,
  };

  render = () => (
    <View style={[styles.box]}>
      <LinearGradient
        colors={['rgba(0,96,255,0.09)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      />
      <View style={[styles.boxImage]}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/bikemap_logo.png')}
        />
      </View>
      <View style={[styles.boxButton]}>
        <FacebookLogin />
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,96,255,0.06)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 100,
        }}
      />
    </View>
  );
}
