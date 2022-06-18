import { useState, useEffect, useMemo } from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import * as Notifications from 'expo-notifications';
import { SelectProvider } from '@mobile-reality/react-native-select-pro';
import { LogBox } from 'react-native';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import Main from './src/components/Main/Main';
import GlobalContext from './src/context/GlobalContext';

export default function App() {
  LogBox.ignoreAllLogs();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  });
  const [isLoaded, setIsloaded] = useState( false );
  const [user, setUser] = useState({});
  const [client, setClient] = useState({});
  const [clients, setClients] = useState([]);

  const memo = useMemo(
    () => ({
      user,
      setUser,
      client,
      setClient,
      clients,
      setClients
    }),
    [user, client]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsloaded( true );
    }, 3000 );
  }, []);

  return (
    <AnimatedSplash
      translucent
      isLoaded={isLoaded}
      backgroundColor='black'
      customComponent={<SplashScreen />}
    >
      <GlobalContext.Provider value={memo}>
        <SelectProvider>
          <Main />
        </SelectProvider>
      </GlobalContext.Provider>
    </AnimatedSplash>
  );
}
