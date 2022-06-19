import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../../config/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get( 'screen' ).height * 0.8
  },
  containerDetails: {
    width: Dimensions.get( 'screen' ).width,
    padding: 5
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  containerPropina: {
    marginTop: 20,
    width: Dimensions.get( 'screen' ).width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtons: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get( 'screen' ).height * 0.18,
    marginTop: 30
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
    marginLeft: 5,
    marginBottom: 15
  },
  formControl: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.8,
    height: Dimensions.get( 'screen' ).height * 0.065,
    paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    paddingLeft: Dimensions.get( 'screen' ).width * 0.02,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 25,
    justifyContent: 'center'
  }
});
export default styles;
