import {TouchableOpacity, ViewStyle, Text, StyleProp} from 'react-native';
import React, {memo} from 'react';
import styles from './styles';
import {COLORS, normalize} from '~/common';
import {IconX} from '~/components';
interface CategoryItemsProps {
  nameCategory: string;
  nameCategoryEnd?: string;
  iconSource: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  disabled?: boolean;
}
const CategoryItems = ({
  nameCategory,
  iconSource,
  onPress,
  containerStyle,
  isSelected,
  disabled,
}: CategoryItemsProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryBtn,
        containerStyle,
        {
          backgroundColor: '#E1E9EE',
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <IconX
        name={iconSource ? iconSource : ''}
        size={60}
        color={isSelected ? COLORS.primary : 'black'}
        style={{marginTop: normalize(5)}}
      />
      <Text style={{marginVertical: normalize(8)}}>{nameCategory}</Text>
    </TouchableOpacity>
  );
};

export default memo(CategoryItems);
