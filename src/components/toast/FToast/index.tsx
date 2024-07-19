import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './styles';

interface IToastProps {}
export interface IToastOption {
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  backgroundColor?: any;
  colorText?: string;
  iconName?: string;
  iconType?: string;
  iconColor?: string;
}

const defaultState = {
  isShow: false,
  message: '',
  position: 'bottom',
  colorText: 'white',
  backgroundColor: 'green',
  iconName: '',
  iconType: '',
  iconColor: 'white',
};

export default class FToast extends Component<IToastProps> {
  private timerID: number = 0;
  private animateOpacityValue = new Animated.Value(0);
  private aniColor = new Animated.Value(0);
  state = {
    ...defaultState,
  };
  showToast = (option: IToastOption) => {
    const {
      message = '',
      position = defaultState.position,
      colorText = defaultState.colorText,
      backgroundColor = defaultState.backgroundColor,
      duration = 2000,
      iconColor = defaultState.iconColor,
      iconName = defaultState.iconName,
      iconType = defaultState.iconType,
    } = option;

    this.setState(
      {
        ...{
          message,
          position,
          colorText,
          backgroundColor,
          duration,
          iconColor,
          iconName,
          iconType,
        },
        isShow: true,
      },
      () => {
        Animated.timing(this.animateOpacityValue, {
          useNativeDriver: false,
          toValue: 1,
          duration: 500,
        }).start(callback => {
          this.hideToast(duration);
        });
      },
    );
  };
  hideToast = (duration: any) => {
    this.timerID = setTimeout(() => {
      Animated.timing(this.animateOpacityValue, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start(() => {
        this.setState({isShow: false});
        clearTimeout(this.timerID);
      });
    }, duration);
  };

  renderIcon = () => {
    const {
      iconColor = defaultState.iconColor,
      iconName = defaultState.iconName,
      iconType = defaultState.iconType,
    } = this.state;
    if (iconName) {
      return (
        <Icon name={iconName} type={iconType} size={20} color={iconColor} />
      );
    }
    return null;
  };

  render() {
    const {} = this.props;
    const {
      isShow,
      message = '',
      position = defaultState.position,
      colorText = defaultState.colorText,
      backgroundColor = defaultState.backgroundColor,
    } = this.state;

    const animatedColor = this.aniColor.interpolate({
      inputRange: [0, 1],
      outputRange: [backgroundColor, backgroundColor],
    });
    if (isShow) {
      return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            zIndex: 9999,
            position: 'absolute',
            top: position == 'top' ? '5%' : '90%',
          }}>
          <Animated.View
            style={{
              ...styles.container,
              opacity: this.animateOpacityValue,
              backgroundColor: animatedColor,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {this.renderIcon()}
              <Text
                numberOfLines={2}
                style={{
                  ...styles.text,
                  marginLeft: 5,
                  color: colorText,
                }}>
                {message}
              </Text>
            </View>
          </Animated.View>
        </View>
      );
    }
    return null;
  }
  componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID);
  }
}
