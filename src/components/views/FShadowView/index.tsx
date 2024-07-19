import React, { Component } from 'react'
import { View, StyleSheet, Platform, ViewStyle } from 'react-native'

interface ILayoutProps {
    cStyle?: ViewStyle | ViewStyle[],
    children?: React.ReactNode,
}
export default class FShadowView extends Component<ILayoutProps> {
    render() {
        const { children, cStyle } = this.props
        return (
            <>
                <View style={[styles.itemContainer, cStyle]} {...this.props}>
                    {children}
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginVertical: 3,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: Platform.OS === 'android' ? 2 : undefined,
    },
})
