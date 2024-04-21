import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import React from 'react';
import { AuthProvider } from '@context/authContext';
import { PaperProvider } from 'react-native-paper';
import { LoadingProvider } from '@context/loadingGlobalContext';

export default function App() {
   const isLoadingComplete = useLoadedAssets();

   if (!isLoadingComplete) {
      return null;
   } else {
      return (
         <AuthProvider>
            <LoadingProvider>
               <PaperProvider>
                  <SafeAreaProvider>
                     <Navigation />
                     <StatusBar />
                  </SafeAreaProvider>
               </PaperProvider>
            </LoadingProvider>
         </AuthProvider>
      );
   }
}
