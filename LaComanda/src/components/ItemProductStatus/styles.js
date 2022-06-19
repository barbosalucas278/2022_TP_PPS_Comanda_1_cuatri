import { StyleSheet } from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
  containerItemProduct: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  containerItemStateProduct: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  containerStateDone: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success
  },
  quantity: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textItemProduct: {
    fontSize: 18,
    marginLeft: 5
  }
});
export default styles;
