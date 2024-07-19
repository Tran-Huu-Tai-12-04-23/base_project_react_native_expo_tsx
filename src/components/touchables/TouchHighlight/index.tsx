import React, { Props } from 'react'
import { StyleSheet, Text, View, TouchableHighlightProperties } from 'react-native'
import { ContainedTouchableProperties, TouchableHighlight } from 'react-native-gesture-handler'

export interface ITouchHighlightProps extends TouchableHighlightProperties, ContainedTouchableProperties, Props<TouchableHighlight> {

}
export default (props: ITouchHighlightProps) => {
    const { children, ...resProps } = props
    return (
        <TouchableHighlight
            {...resProps}
        >
            {children}
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({})
