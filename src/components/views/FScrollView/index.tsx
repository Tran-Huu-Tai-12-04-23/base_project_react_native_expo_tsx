import React, { Component } from 'react'
import { ScrollViewProperties, } from 'react-native'
import { ScrollView, NativeViewGestureHandlerProperties } from 'react-native-gesture-handler'

export type IScrollViewProps = NativeViewGestureHandlerProperties & ScrollViewProperties

export default class FScrollView extends Component<IScrollViewProps>  {
    render() {
        return (
            <ScrollView
                {...this.props}
            >
                {this.props.children}
            </ScrollView>
        )
    }
}
