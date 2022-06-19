import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../config/theme';
import { OrderStatus, UserTypes } from '../../util/Enums';
import GameTab from './GameTab/GameTab';
import OrderTab from './OrderTab/OrderTab';
import SurveysTab from './SurveysTab/SurveysTab';
import GlobalContext from '../../context/GlobalContext';
import WaitingConfirmation from './OrderTab/WaitingConfirmation/WaitingConfirmation';
import WaitingConfirmedOrder from './OrderTab/WaitingConfirmedOrder/WaitingConfirmedOrder';
import ClientConfirmation from './OrderTab/ClientConfirmation/ClientConfirmation';
import ClientEating from './OrderTab/ClientEating/ClientEating';
import WaitingCheck from './OrderTab/WaitingCheck/WaitingCheck';

const Tab = createBottomTabNavigator();

function renderTabBarIcon( route, size ) {
  let iconName;
  let iconColor;

  switch ( route.name ) {
    case 'Juegos':
      iconColor = theme.colors.icons;
      iconName = 'gamepad';
      break;
    case 'Pedido':
      iconColor = theme.colors.icons;
      iconName = 'concierge-bell';
      break;
    case 'Encuestas':
      iconColor = theme.colors.icons;
      iconName = 'message-star';
      break;
    default:
      break;
  }

  return ( iconName === 'message-star'
    ? <IconMaterial name={iconName} size={size} color={iconColor} />
    : <Icon name={iconName} size={size} color={iconColor} />
  );
}
export default function TableMenu() {
  const { client } = useContext( GlobalContext );
  const renderTabPedidos = () => {
    switch ( client.orderState ) {
      case OrderStatus.ScannedAssignedTable:
        return OrderTab;
      case OrderStatus.OrderSended:
        return WaitingConfirmation;
      case OrderStatus.OrderConfirmed:
        return WaitingConfirmedOrder;
      case OrderStatus.OrderRecived:
      case OrderStatus.OrderRecivedConfirmed:
        return ClientConfirmation;
      case OrderStatus.ClientEating:
        return ClientEating;
      case OrderStatus.WaitingCheck:
        return WaitingCheck;
      default:
        return OrderTab;
    }
  };
  return (
    <Tab.Navigator
      initialRouteName='Pedido'
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ size }) => renderTabBarIcon( route, size ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.neutral
        })
      }
    >
      <Tab.Screen
        name='Juegos'
        component={GameTab}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
      <Tab.Screen
        name='Pedido'
        component={renderTabPedidos()}
        initialParams={{ displayFormOnType: UserTypes.None }}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
      <Tab.Screen
        name='Encuestas'
        component={SurveysTab}
        initialParams={{ displayFormOnType: UserTypes.None }}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
    </Tab.Navigator>
  );
}

