import React, { Props } from 'react'
import { TouchableNativeFeedbackProperties, } from 'react-native'
import { TouchableNativeFeedback, ContainedTouchableProperties } from 'react-native-gesture-handler'

export interface ITouchNativeFeedbackProps extends TouchableNativeFeedbackProperties, ContainedTouchableProperties, Props<TouchableNativeFeedback> {

}

export default (props: ITouchNativeFeedbackProps) => {
    const { children, ...resProps } = props
    return (
        <TouchableNativeFeedback
            {...resProps}
        >
            {children}
        </TouchableNativeFeedback>

    )
}
