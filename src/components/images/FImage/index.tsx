import React from 'react'
import { View, Text, Image, ImageProps } from 'react-native'

interface IProps extends ImageProps {
}

export default (props: IProps) => {
    return (
        <Image {...props} />
    )
}