import { BlurView } from 'expo-blur';
import React, { createContext, useContext, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet } from 'react-native';

interface LoadingContextValue {
   isLoading: boolean;
   startLoading: () => void;
   stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const useLoading = () => {
   const context = useContext(LoadingContext);
   if (!context) {
      throw new Error('useLoading   must be used within an LoadingProvider');
   }
   return context;
};

interface PropsType {
   children: React.ReactNode;
}
export const LoadingProvider = ({ children }: PropsType) => {
   const [isLoading, setIsLoading] = useState(false);

   const startLoading = () => {
      setIsLoading(true);
   };

   const stopLoading = () => {
      setIsLoading(false);
   };

   return (
      <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
         <Modal animationType="fade" transparent={true} visible={isLoading} onRequestClose={() => {}}>
            <BlurView intensity={100} tint="light" style={styles.blurContainer}>
               <ActivityIndicator color={'#0C66E4'} size="large" />
            </BlurView>
         </Modal>

         {children}
      </LoadingContext.Provider>
   );
};

const styles = StyleSheet.create({
   blurContainer: {
      overflow: 'hidden',
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
   },
});
