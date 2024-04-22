import { deviceWidth } from '@helper/utils';
import { blackColor, whiteColor } from '../../constants/Colors';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
   btnLabelStyle: {
      color: '#d7e4ee',
      fontWeight: 'normal',
   },
   btn: {
      borderRadius: 60,
      height: 40,
      width: deviceWidth / 2,
      justifyContent: 'center',
      alignSelf: 'center',
   },
   shadown: {
      borderWidth: 1,
      borderColor: '#EEEEEE',
      borderRadius: 10,
      color: blackColor,
      shadowColor: blackColor,
      shadowOffset: {
         width: 15,
         height: 15,
      },
      shadowOpacity: 0.1,
      shadowRadius: 35,
      elevation: 4,
   },
});
