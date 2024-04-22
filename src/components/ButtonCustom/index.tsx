import { styles } from './style';
import { Button, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { blackColor, btnPrimary, primaryColor, whiteColor } from '@constants/Colors';
import React from 'react';
import Row from '@components/Row';

type ButtonProps = {
   startIcon?: any;
   endIcon?: any;
   onPress: () => void;
   isLoading?: boolean;
   isEdit?: boolean;
   mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
   radius?: number;
   title: string;
   background?: any;
   textColor?: any;
   labelStyle?: any;
   style?: {};
   primary?: boolean;
   full?: boolean;
};
function ButtonCustom(props: ButtonProps) {
   const {
      background = primaryColor,
      startIcon,
      endIcon,
      onPress,
      radius = 10,
      title,
      isLoading,
      isEdit,
      mode = 'text',
      textColor = blackColor,
      labelStyle = {},
      style = {},
      primary = false,
      full = false,
   } = props;

   const [color, setColor] = useState(textColor);
   useEffect(() => {
      if (mode === 'outlined') {
         setColor(btnPrimary);
      }
   }, [mode]);
   return (
      <TouchableOpacity>
         <Button
            disabled={isEdit}
            loading={isLoading}
            onPress={onPress}
            mode={mode}
            rippleColor="transparent"
            buttonColor={primary ? btnPrimary : background}
            style={{
               borderRadius: radius,
               alignContent: 'center',
               alignItems: 'center',
               justifyContent: 'center',
               borderStyle: 'solid',
               borderWidth: 1,
               borderColor: mode === 'outlined' ? btnPrimary : 'transparent',
               width: full ? '100%' : 'auto',
               ...style,
            }}
            labelStyle={{
               ...styles.btnLabelStyle,
               color: primary ? whiteColor : color,
               ...labelStyle,
            }}
         >
            <Row center style={{ columnGap: 20 }}>
               {startIcon}
               <Text
                  style={{
                     ...styles.btnLabelStyle,
                     color: primary ? whiteColor : color,
                     ...labelStyle,
                  }}
               >
                  {title}
               </Text>
               {endIcon}
            </Row>
         </Button>
      </TouchableOpacity>
   );
}

export default ButtonCustom;
