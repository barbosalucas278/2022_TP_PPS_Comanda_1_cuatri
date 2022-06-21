import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../../config/theme';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get( 'screen' ).height * 0.63
  },
  containerList: {
    height: Dimensions.get( 'screen' ).height * 0.78
  },
  estimatedTimeText: {
    textAlign: 'center',
    fontSize: 23
  },
  containerOrderButton: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: -Dimensions.get( 'screen' ).height * 0.23
  },
  orderButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: theme.colors.success,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderButtonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15
  },
  orderTotalPriceButtonText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15
  }
});
export default styles;
