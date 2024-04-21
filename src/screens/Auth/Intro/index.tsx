import { styleGlobal } from '../../../styles';
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '@context/authContext';
import { useLoading } from '@context/loadingGlobalContext';
import PagerView from 'react-native-pager-view';

function MyPager() {
   const [currentPage, setCurrentPage] = useState(0);
   const slide = useRef<PagerView | null>(null);

   useEffect(() => {
      const interval = setInterval(() => {
         const nextPage = (currentPage + 1) % 3;
         setCurrentPage(nextPage);
         slide?.current?.setPage(nextPage);
      }, 3000);
      return () => clearInterval(interval);
   }, [currentPage]);

   return (
      <PagerView ref={slide} style={styles.container} initialPage={0}>
         <View style={[styles.page, { backgroundColor: '#FFC107' }]} key="1">
            <Text style={styles.text}>First page</Text>
            <Text style={styles.swipeText}>Swipe ➡️</Text>
         </View>
         <View style={[styles.page, { backgroundColor: '#2196F3' }]} key="2">
            <Text style={styles.text}>Second page</Text>
         </View>
         <View style={[styles.page, { backgroundColor: '#4CAF50' }]} key="3">
            <Text style={styles.text}>Third page</Text>
         </View>
      </PagerView>
   );
}
export default function IntroScreen() {
   const { login } = useAuth();
   const { startLoading } = useLoading();
   return (
      <View style={styleGlobal.container}>
         <Text style={styleGlobal.title}>Hello login</Text>
         <TouchableOpacity onPress={() => startLoading()}>
            <Button title="Login"></Button>
         </TouchableOpacity>

         <MyPager />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   page: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   text: {
      fontSize: 24,
      color: 'white',
      marginBottom: 10,
   },
   swipeText: {
      fontSize: 18,
      color: 'white',
      fontStyle: 'italic',
   },
});
