import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../apis/post.api'
import CenteredMessage from '../components/atoms/CenteredMessage.component'
import PostCard from '../components/molecules/PostCard.component'
import { navigateTo } from '../helpers/navigation.helper'
import { setPost } from '../redux/slices/post.slice'
import { apiWrapper } from '../utils/wrapper.api'


const Feeds = () => {
  const { post } = useSelector((state) => state.post)
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch()

  const success_func = (res) => {
    dispatch(setPost(res.data))
    navigateTo('Feeds')
    setRefreshing(false)
  }

  useEffect(() => {
    apiWrapper(getPost, success_func)
  }, [])

  const updateHandler = () => {
    setRefreshing(true)
    apiWrapper(getPost, success_func)
  }


  return (
    <View style={styles.container} key={post._id}>
      <FlatList
        data={post}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={updateHandler} />
        }
        ListEmptyComponent={
          <CenteredMessage
            title={'No Feeds'}
            message={'Please follow any topic or come back later for newer post.'}
          />
        }
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    paddingBottom: '25%',
    top: 100
  }
})

export default Feeds
