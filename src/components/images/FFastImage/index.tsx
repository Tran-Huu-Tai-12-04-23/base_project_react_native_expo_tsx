import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Image, { FastImageProps } from "react-native-fast-image"

interface IProps extends FastImageProps {

}
export default class FFastImage extends Component<IProps>{
    render() {
        return (
            <Image {...this.props} />
        )
    }
}
