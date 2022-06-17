/* eslint-disable react/prop-types */
import { View, TouchableOpacity } from 'react-native';
import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Credentials from '../../pages/Credentials/Credentials';
import Home from '../../pages/Home/Home';
import theme from '../../config/theme';
import Approvals from '../../pages/Approvals/Approvals';
import Addition from '../../pages/Addition/Addition';
import { signOutUser } from '../../services/AuthService';
import { navigationRef, navigate } from '../../config/RootNavigation';
import ClientsOnHold from '../../pages/ClientsOnHold/ClientsOnHold';
import ClientHome from '../../pages/ClientHome/ClientHome';
import TableMenu from '../../pages/TableMenu/TableMenu';
import WaiterChat from '../../pages/WaiterChat/WaiterChat';
import WaiterOrderView from '../../pages/WaiterOrderView/WaiterOrderView';

const Stack = createNativeStackNavigator();

export default function Main() {
  const handleLogout = () => {
    signOutUser();
    navigate( 'Credentials', { screen: 'Ingresar' });
  };
  const handleProfile = () => {
    navigate( 'Home', { screen: 'Home' });
  };

  function renderHeaderLogoutIcon() {
    return (
      <TouchableOpacity onPress={handleLogout}>
        <MaterialCommunityIcons name='logout' size={40} color='white' />
      </TouchableOpacity>
    );
  }
  function renderHeaderProfileIcon() {
    return (
      <TouchableOpacity onPress={handleProfile}>
        <Icon name='user-o' size={36} color='white' />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerRight: () => renderHeaderLogoutIcon()
          }}
        >
          <Stack.Screen
            options={{
              title: 'Aplicación',
              headerStyle: {
                backgroundColor: 'white'
              },
              headerShown: false,
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Roboto'
              }
            }}
            name='Credentials'
            component={Credentials}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Mi Perfil'
            }}
            name='Home'
            component={Home}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Aprobaciones'
            }}
            name='Approvals'
            component={Approvals}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Altas'
            }}
            name='Additions'
            component={Addition}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Clientes en espera'
            }}
            name='ClientsOnHold'
            component={ClientsOnHold}
          />
          <Stack.Screen
            options={{
              headerLeft: () => renderHeaderProfileIcon(),
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Inicio'
            }}
            name='ClientsHome'
            component={ClientHome}
          />
          <Stack.Screen
            options={{
              headerLeft: () => renderHeaderProfileIcon(),
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Menú'
            }}
            name='TableMenu'
            component={TableMenu}
          />
          <Stack.Screen
            options={{
              headerLeft: () => renderHeaderProfileIcon(),
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Chat'
            }}
            name='WaiterChat'
            component={WaiterChat}
          />
          <Stack.Screen
            options={{
              headerLeft: () => renderHeaderProfileIcon(),
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Pedidos'
            }}
            name='WaiterOrderView'
            component={WaiterOrderView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
