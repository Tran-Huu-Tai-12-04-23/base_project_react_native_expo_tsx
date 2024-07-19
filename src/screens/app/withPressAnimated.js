import React, {useRef} from 'react';
import {View as AnimatableView} from 'react-native-animatable';
import {throttle} from 'lodash';
import {ANIMATIONS} from '.';

export default function (WrappedComponent) {
  return ({
    onPress,
    // delay = 0,
    // duration = 500,
    delay = 300,
    duration = 500,
    animation = 'zoomIn',
    ...rest
  }) => {
    const compEl = useRef(null);
    const onPressAnimatedDelayed = throttle(
      event => {
        onPress && onPress(event);
        compEl.current.animate('zoomInOut', duration);
      },
      delay,
      {trailing: false},
    );

    return (
      <AnimatableView ref={compEl}>
        <WrappedComponent onPress={onPressAnimatedDelayed} {...rest} />
      </AnimatableView>
    );
  };
}
