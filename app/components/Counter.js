import React from 'react'
import { View, Text, Button } from 'react-native'
import { increment, decrement } from '../redux/slices/counterSlice'
import { useSelector, useDispatch } from 'react-redux'

const Counter = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <View>
      <Button onPress={() => dispatch(increment())} title="increment" />
      <Button onPress={() => dispatch(decrement())} title="decrement" />
      <Text>You clicked me {count} times</Text>
    </View>
  )
}
export default Counter
