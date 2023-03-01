import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import globalStyles from '../../styles/global.styles'
import CustomImage from '../atoms/CustomImage.component'

import ReadMore from '@fawazahmed/react-native-read-more'
import PropTypes from 'prop-types'
import { colors } from '../../variables/colors.variables'
import { Base_uri } from '../../variables/variable'

const PostCard = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <PostProfileHeader post={post} />
        <PostContent post={post} />
        <PostFooter post={post} />
      </View>
    </View>
  )
}

const PostProfileHeader = ({ post }) => {
  return (
    <View style={styles.header}>
      <CustomImage
        source={{ uri: post.user.profilePic }}
        shape={'circle'}
        height={50}
        width={50}
      />
      <View style={styles.profileContent}>
        <Text style={styles.name}>{post.user.name}</Text>
        <Text style={styles.createdAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  )
}

const PostContent = ({ post }) => {
  // dimensions for posting image in feeds
  const dimensions = useWindowDimensions()
  const imageHeight = Math.round((dimensions.width * 9) / 16) - 30
  const imageWidth = dimensions.width - 30
  console.log(post)

  return (
    <View style={styles.body}>
      <ReadMore
        allowFontScaling={true}
        numberOfLines={3}
        style={styles.caption}
      >
        {post.caption}
      </ReadMore>
      <View style={styles.postImage}>
        <FlatList
          horizontal
          // pagingEnabled
          // showsHorizontalScrollIndicator={false}
          data={post.attachments}
          renderItem={({ item }) => (
            // <Image source={{ uri: item }} />
            <CustomImage
              source={{ uri: `${Base_uri}${item}`}}
              shape={'curvedSquare'}
              width={imageWidth}
              height={imageHeight}
            />
          )}
        ></FlatList>
      </View>
      <View>
        <FlatList
          data={post.tags}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={styles.tags}>#{item}</Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  )
}

const PostFooter = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes)

  return (
    <View style={globalStyles.flexRow}>
      <TouchableOpacity
        style={[globalStyles.flexRow, styles.footer]}
        onPress={() => {
          setLikeCount(likeCount + 1)
        }}
      >
        <Ionicons name={'heart'} size={24} color={'red'} />
        <Text> {likeCount} likes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[globalStyles.flexRow, styles.footer]}>
        <Ionicons name={'chatbubbles-outline'} size={24} color={'black'} />
        <Text> comments</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    marginBottom: 5,
    marginHorizontal: 5
  },
  caption: { fontSize: 16, marginBottom: 5 },
  container: { marginBottom: 10, marginHorizontal: 8 },
  createdAt: {
    color: colors.lightGrey,
    fontSize: 12
  },
  footer: {
    marginLeft: 5,
    marginRight: 10
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginVertical: 5
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  postImage: {
    marginBottom: 5
  },
  profileContent: {
    marginLeft: 10,
    marginTop: 3
  },
  tags: {
    color: colors.blue,
    fontSize: 13
  }
})

PostCard.propTypes = {
  post: PropTypes.object
}

PostProfileHeader.propTypes = {
  post: PropTypes.object
}

PostContent.propTypes = {
  post: PropTypes.object
}

PostFooter.propTypes = {
  post: PropTypes.object
}

export default PostCard
