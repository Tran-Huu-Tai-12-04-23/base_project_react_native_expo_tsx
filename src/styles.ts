import { borderColor } from '@constants/Colors';
import { StyleSheet } from 'react-native';

export const styleGlobal = StyleSheet.create({
   borderBottom: {
      borderBottomWidth: 1,
      borderColor: borderColor,
      borderStyle: 'solid',
   },
   border: { borderWidth: 1, borderColor: borderColor, borderStyle: 'solid' },
   borderTop: { borderTopWidth: 1, borderColor: borderColor, borderStyle: 'solid' },
   text: {
      color: '#1F2937',
   },
   container: {
      flex: 1,
      paddingTop: 50,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
   },
});
