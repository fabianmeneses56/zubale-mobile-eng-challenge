import 'react-native-gesture-handler';

import { StatusBar, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { BottomTabNavigation } from './presentation/navigation/BottomTabNavigation';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <BottomTabNavigation />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
