import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {},
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
    textAlign: 'center'

  }
});
export default styles;
