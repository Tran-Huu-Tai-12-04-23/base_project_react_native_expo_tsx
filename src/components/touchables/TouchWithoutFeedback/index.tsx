import React, { Props } from 'react'
import { TouchableWithoutFeedbackProperties, } from 'react-native'
import { TouchableWithoutFeedback, ContainedTouchableProperties } from 'react-native-gesture-handler'

export interface ITouchWithoutFeedbackProps extends TouchableWithoutFeedbackProperties,
    ContainedTouchableProperties, Props<TouchableWithoutFeedback> {

}

export default (props: ITouchWithoutFeedbackProps) => {

    const { children, ...resProps } = props
    return (
        <TouchableWithoutFeedback
            {...resProps}
        >
            {children}
        </TouchableWithoutFeedback>

    )
}
