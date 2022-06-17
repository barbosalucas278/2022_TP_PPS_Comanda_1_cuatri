import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height: Dimensions.get( 'screen' ).height * 0.6,
    width: Dimensions.get( 'screen' ).width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    color: theme.colors.secondary
  },
  buttonAsigned: {
    backgroundColor: theme.colors.icons,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    color: theme.colors.secondary
  },
  buttonConfirm: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10
  },
  buttonClose: {
    backgroundColor: theme.colors.icons
  },
  textButton: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.secondary
  },
  textButtonAsigned: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.secondary
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    height: Dimensions.get( 'screen' ).height,
    width: Dimensions.get( 'screen' ).width
  },
  clientCard: {
    width: Dimensions.get( 'screen' ).width * 0.9,
    height: Dimensions.get( 'screen' ).height * 0.25,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    marginBottom: 15,
    marginTop: 10
  },
  cardContainer: {
    width: Dimensions.get( 'screen' ).width * 0.95,
    height: Dimensions.get( 'screen' ).height,
    padding: 5
  },
  text: {
    fontWeight: '700',
    textAlign: 'center'
  },
  textName: {
    textAlign: 'left',
    borderBottomColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.9,
    borderBottomWidth: 2,
    color: theme.colors.neutral,
    fontWeight: '500',
    fontSize: 24
  },
  textOrder: {
    textAlign: 'center',
    width: Dimensions.get( 'screen' ).width * 0.9,
    color: theme.colors.secondary,
    fontWeight: '700',
    fontSize: 24
  },
  icon: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 5,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: theme.colors.primary
  },
  iconDisabled: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 5,
    borderColor: theme.colors.icons,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: theme.colors.icons
  }
});

