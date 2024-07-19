import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

interface IProps {
    flex: string,
    row: any,
    center: any,
    middle: any,
    right: any,
    space: any,
    style: any,
}
export default class FBlock extends Component<IProps> {
    render() {
        const { flex, row, center, middle, right, space, style, children, ...props } = this.props;
        const blockStyles = [
            styles.block,
            flex && { flex },
            flex === 'disabled' && { flex: 0 },
            center && styles.center,
            middle && styles.middle,
            right && styles.right,
            space && { justifyContent: `space-${space}` },
            row && styles.row,
            style,
        ];
        return (
            <View style={blockStyles} {...props}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    center: {
        alignItems: 'center'
    },
    middle: {
        justifyContent: 'center'
    },
    right: {
        justifyContent: 'flex-end'
    },
});
