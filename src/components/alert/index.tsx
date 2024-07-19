import {Alert} from 'react-native';

type AlertProps = {
  title?: string;
  message?: string;
  callback?: () => void;
  buttonStyle?: 'destructive' | 'default' | 'cancel' | undefined;
};

export const alertError = (props: AlertProps) => {
  const {
    callback,
    title = '',
    message = '',
    buttonStyle = 'destructive',
  } = props;
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => callback && callback(),
        style: buttonStyle,
      },
    ],
    {
      cancelable: false,
    },
  );
};

type ConfirmAlertProps = {
  title?: string | null;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  buttonStyle?: 'destructive' | 'default' | 'cancel' | undefined;
  onPress?: () => void;
  onPressCancel?: () => void;
};

export const confirmAlert = (props: ConfirmAlertProps) => {
  const {
    title,
    message,
    confirmText,
    cancelText,
    buttonStyle,
    onPress,
    onPressCancel,
  } = props;
  return Alert.alert(
    title || 'Confirm',
    message,
    [
      {
        text: confirmText ?? 'OK',
        onPress,
        style: buttonStyle,
      },
      {
        text: cancelText ?? 'Cancel',
        onPress: onPressCancel,
      },
    ],
    {cancelable: false},
  );
};
