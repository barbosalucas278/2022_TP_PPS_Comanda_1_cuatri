import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get( 'screen' ).height * 0.85
  },
  formControl: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.8,
    height: Dimensions.get( 'screen' ).height * 0.065,
    paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    paddingLeft: Dimensions.get( 'screen' ).width * 0.02,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 25
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5
  },
  textButton: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    height: Dimensions.get( 'screen' ).height * 0.1,
    width: Dimensions.get( 'screen' ).width * 0.6,
    borderRadius: 10,
    marginLeft: 45,
    marginTop: 35
  }
});
export default styles;
