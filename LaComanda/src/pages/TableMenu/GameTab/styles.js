import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.icons,
    height: Dimensions.get( 'screen' ).height * 0.9
  },
  containerStartGame: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStartGame: {
    color: theme.colors.details,
    fontSize: 40
  }
});
export default styles;
