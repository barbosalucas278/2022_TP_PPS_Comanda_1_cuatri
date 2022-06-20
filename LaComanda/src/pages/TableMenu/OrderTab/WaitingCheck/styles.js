import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../../config/theme';

const styles = StyleSheet.create({
  containerImg: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: Dimensions.get( 'screen' ).height * 0.05
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 40
  },
  textDetails: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10
  },
  containerListOfItemsProduct: {
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
    marginTop: 10
  }
});
export default styles;
