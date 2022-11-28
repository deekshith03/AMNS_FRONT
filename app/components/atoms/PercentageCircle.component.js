import propTypes from "prop-types";
import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';

let direction = I18nManager.isRTL ? 'right' : 'left';
let opDirection = I18nManager.isRTL ? 'Left' : 'Right';
const styles = StyleSheet.create({
  halfCircle: {
    [`borderBottom${opDirection}Radius`]: 0,
    [`borderTop${opDirection}Radius`]: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  leftWrap: {
    [`${direction}`]: 0,
    position: 'absolute',
    top: 0,
  },
  outerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function percentToDegrees(percent) {
  return percent * 3.6
}

export const PercentageCircle = ({
  color,
  shadowColor,
  bgColor,
  radius,
  borderWidth,
  percent,
  children
}) => {


  const computeDerivedState = () => {
    const needHalfCircle2 = percent > 50
    let halfCircle1Degree
    let halfCircle2Degree
    // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
    if (needHalfCircle2) {
      halfCircle1Degree = 180
      halfCircle2Degree = percentToDegrees(percent)
    } else {
      halfCircle1Degree = percentToDegrees(percent)
      halfCircle2Degree = 0
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      halfCircle2Styles: {
        // when the second half circle is not needed, we need it to cover
        // the negative degrees of the first circle
        backgroundColor: needHalfCircle2
          ? color
          : shadowColor,
      },
    }
  }

  const renderHalfCircle = (rotateDegrees, halfCircleStyles) => {
    // const { radius, color } = {radius, color}
    // const key = I18nManager.isRTL ? 'right' : 'left';

    styles['mystyle'] = {
      backgroundColor: color,
      borderRadius: radius,
      height: radius * 2,
      overflow: 'hidden',
      transform: [
        { translateX: radius / 2 },
        { rotate: `${rotateDegrees}deg` },
        { translateX: -radius / 2 },
      ],
      width: radius,
      ...halfCircleStyles,
    }

    return (
      <View
        style={
          [
            styles.leftWrap,
            {
              width: radius,
              height: radius * 2,
            },
          ]}
      >
        <View
          style={[
            styles.halfCircle,
            styles.mystyle
          ]}
        />
      </View>
    )
  }

  const renderInnerCircle = () => {
    const radiusMinusBorder = radius - borderWidth
    return (
      <View
        style={[
          styles.innerCircle,
          {
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: bgColor,
          },
        ]}
      >
        {children}
      </View>
    )
  }

  const {
    halfCircle1Degree,
    halfCircle2Degree,
    halfCircle2Styles,
  } = computeDerivedState()

  return (
    <View
      style={[
        styles.outerCircle,
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: shadowColor,
        },
      ]}
    >
      {renderHalfCircle(halfCircle1Degree)}
      {renderHalfCircle(halfCircle2Degree, halfCircle2Styles)}
      {renderInnerCircle()}
    </View>
  )
}

PercentageCircle.propTypes = {
  color: propTypes.string,
  shadowColor: propTypes.string,
  bgColor: propTypes.string,
  radius: propTypes.number.isRequired,
  borderWidth: propTypes.number,
  percent: propTypes.number,
  children: propTypes.node,
}

PercentageCircle.defaultProps = {
  color: '#00f',
  shadowColor: '#999',
  bgColor: '#fff',
  borderWidth: 4,
  percent: 0
};