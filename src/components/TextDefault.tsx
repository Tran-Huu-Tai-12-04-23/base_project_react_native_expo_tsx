import React, { FC, ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { styleGlobal } from 'src/styles';

interface Props extends RNTextProps {
   children: ReactNode;
}

const TextDefault: FC<Props> = ({ children, style, ...rest }) => {
   return (
      <RNText style={[styleGlobal.text, style]} {...rest}>
         {children}
      </RNText>
   );
};

export default TextDefault;
