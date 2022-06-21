import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.85,
    justifyContent: 'flex-start'
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
    height: Dimensions.get( 'screen' ).height * 0.2,
    width: Dimensions.get( 'screen' ).width * 0.6,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 35
  },
  containerChatIcon: {
    // position: 'absolute',
    // bottom: 0,
    // left: 130,
    // backgroundColor: theme.colors.primary,
    // borderRadius: 50,
    // padding: 10,
    // marginBottom: -70
  },
  containerChatIconTouchable: {
    bottom: 0,
    left: 150,
    borderRadius: 50,
    padding: 10,
    marginBottom: -70,
    backgroundColor: 'green'
  }
});
export default styles;
