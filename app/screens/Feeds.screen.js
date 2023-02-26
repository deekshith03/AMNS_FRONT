import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getPost } from '../apis/post.api'
import CenteredMessage from '../components/atoms/CenteredMessage.component'
import PostCard from '../components/molecules/PostCard.component'
import { apiWrapper } from '../utils/wrapper.api'
// import { posts } from '../data/posts.sample'

const Feeds = () => {
  const { post } = useSelector((state) => state.post)

  if (post.length === 0) {
    apiWrapper(getPost)
  }

  // const post = posts

  return !post.length ? (
    <CenteredMessage
      title={'No Feeds'}
      message={'Please follow any topic or come back later for newer post.'}
    ></CenteredMessage>
  ) : (
    <View style={styles.container} key={post._id}>
      <FlatList
        data={post}
        renderItem={({ item }) => <PostCard post={item} />}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '25%',
    top: 90
  }
})

export default Feeds
