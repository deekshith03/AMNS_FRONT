import ReadMore from '@fawazahmed/react-native-read-more'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import globalStyles from '../../styles/global.styles'
import { colors, colors_dark } from '../../variables/colors.variables'
import CustomButton from '../atoms/CustomButton.component'

const Comments = ({ comments }) => {
  const [commentText, setCommentText] = useState('')

  const handleAddComment = () => {}

  return (
    <View style={[globalStyles.dflex, styles.commentSection]}>
      <Text style={styles.header}>{'Comments'}</Text>
      <ScrollView nestedScrollEnabled={true} style={styles.commentScrollHeight}>
        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentItem comment={item} />}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>

      <View style={styles.newComment}>
        <TextInput
          style={styles.commentInput}
          placeholder="Type a comment"
          onChangeText={(value) => setCommentText(value)}
        />
        <CustomButton
          text={'Comment'}
          alignItems="center"
          handleClick={handleAddComment}
          backgroundColor={colors.loginPink}
          fontColor={colors.white}
          fontFamily={'Roboto'}
          fontSize={15}
          customWidth={80}
        />
      </View>
    </View>
  )
}

const CommentItem = ({ comment }) => {
  const [replyText, setReplyText] = useState('')
  const [replyVisible, setReplyVisible] = useState(false)

  const changeReplyState = () => {
    setReplyVisible(!replyVisible)
  }

  const handleAddReply = () => {}

  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.name}>{comment.name}</Text>
        <ReadMore
          allowFontScaling={true}
          numberOfLines={4}
          style={styles.commentBody}>
          {comment.body}
        </ReadMore>
      </View>
      <TouchableOpacity onPress={changeReplyState} style={globalStyles.flexRow}>
        <Text style={styles.reply}>Reply</Text>
      </TouchableOpacity>
      {replyVisible && (
        <View style={styles.newReply}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a reply"
            onChangeText={(value) => setReplyText(value)}
          />
          <CustomButton
            text={'Reply'}
            alignItems="center"
            handleClick={handleAddReply}
            backgroundColor={colors.loginPink}
            fontColor={colors.white}
            fontFamily={'Roboto'}
            fontSize={14}
            customWidth={50}
          />
        </View>
      )}
      <FlatList
        data={comment.replies}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  commentBody: {
    marginLeft: 10
  },
  commentInput: {
    borderBottomWidth: 1,
    borderColor: colors_dark.textColor_dark,
    flex: 1,
    marginHorizontal: 10,
    padding: 5
  },
  commentScrollHeight: {
    maxHeight: 280
  },
  commentSection: {
    borderColor: colors_dark.textColor_dark,
    borderTopWidth: 1,
    marginBottom: 5,
    padding: 5
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  item: {
    backgroundColor: colors.logingray,
    borderRadius: 3,
    padding: 5
  },
  itemContainer: {
    // --- comment child indicator ---
    // borderColor: colors_dark.textColor_dark,
    // borderLeftWidth: 1,
    // borderStyle: 'dashed',
    // --- comment child indicator ---
    marginLeft: 20,
    marginRight: 5
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3
  },
  newComment: {
    flexDirection: 'row',
    marginTop: 5
  },
  newReply: {
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 15,
    maxWidth: '90%'
  },
  reply: {
    marginBottom: 8,
    marginLeft: 15,
    opacity: 0.7
  }
})

Comments.propTypes = {
  comments: PropTypes.array
}

CommentItem.propTypes = {
  comment: PropTypes.object
}

export default Comments
