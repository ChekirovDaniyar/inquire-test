import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import {Button, Card, CardBody, CardText, CardTitle, Spinner} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch} from "../../../redux/store"
import {getPostById} from "../../../redux/reducers/posts"
import {IComment} from "../../../redux/reducers/types"
import CommentView from "../../comment/view"
import AddCommentModal from "../../comment/components/AddComentModal"
import CreateUpdatePost from "../components/CreateUpdatePost"
import DeletePost from "../components/DeletePost"


const PostView: React.FC = () => {
  const [showAddComment, setShowAddComment] = useState<boolean>(false)
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const { id } = useParams()
  const { selectedPost, loading } = useSelector((state: any) => state.posts)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPostById({id, params: {_embed: 'comments'}}))
  }, [dispatch])

  return (
    loading ? <Spinner /> : selectedPost ? (
      <Card>
        <CardBody>
          <Link to="/">View all posts</Link>
          <CardTitle tag="h1" className="text-center">{selectedPost.title}</CardTitle>
          <CardText>{selectedPost.body}</CardText>

          <Button color="primary" onClick={() => setShowUpdate(true)}>Update post</Button>
          <Button color="info" className="mx-1" onClick={() => setShowAddComment(true)}>Add comment</Button>
          <Button color="danger" className="mx-1" onClick={() => setShowDelete(true)}>Delete post</Button>

          <h5>Comments: {selectedPost.comments.length}</h5>
          {selectedPost.comments.map((comment: IComment) => (
            <CommentView key={comment.id} comment={comment} />
          ))}
        </CardBody>
        <AddCommentModal show={showAddComment} setShow={setShowAddComment} postId={selectedPost.id} />
        <CreateUpdatePost show={showUpdate} setShow={setShowUpdate} post={selectedPost} />
        <DeletePost show={showDelete} setShow={setShowDelete} id={selectedPost.id} />
      </Card>
    ) : <h1>Failed to load post</h1>
  )
}

export default PostView
