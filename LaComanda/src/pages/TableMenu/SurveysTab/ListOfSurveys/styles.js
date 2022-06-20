import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get( 'screen' ).height * 1.7,
    padding: 0
  },
  containerSpinner: {
    height: Dimensions.get( 'screen' ).height * 0.8,
    width: Dimensions.get( 'screen' ).width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  charTitle: {
    textAlign: 'center',
    fontSize: 19
  }
});
export default styles;
