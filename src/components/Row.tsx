import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'

interface RowProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  between?: boolean
  around?: boolean
  evenly?: boolean
  start?: boolean
  center?: boolean
  end?: boolean
}

const Row = (props: RowProps) => {
  const { children, style, between, around, evenly, start, center, end } = props
  const rowStyle = [
    styles.container,
    between && styles.spaceBetween,
    around && styles.spaceAround,
    evenly && styles.spaceEvenly,
    start && styles.flexStart,
    center && styles.flexCenter,
    end && styles.flexEnd,
    style
  ]

  return <View style={rowStyle}>{children}</View>
}

export default Row

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  spaceEvenly: {
    justifyContent: 'space-evenly'
  },
  flexStart: {
    justifyContent: 'flex-start'
  },
  flexCenter: {
    justifyContent: 'center'
  },
  flexEnd: {
    justifyContent: 'flex-end'
  }
})
