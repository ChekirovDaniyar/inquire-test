import React, {useEffect, useState} from "react"
import {Button, Spinner} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"

import {IPost} from "../../../redux/reducers/types"
import PostCard from "../components/PostCard"
import {getPostsList} from "../../../redux/reducers/posts"
import {AppDispatch} from "../../../redux/store"
import CreateUpdatePost from "../components/CreateUpdatePost"

const PostsList: React.FC = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const {data, loading} = useSelector((state: any) => state.posts)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPostsList())
  }, [dispatch])

  return (
    <div>
      <div className="fixed-top">
        <Button color="primary" onClick={() => setShowCreate(true)}>Create Post</Button>
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        {!!loading && <Spinner />}
        {!loading && !!data.length && (
          data.map((post: IPost) => <PostCard key={post.id} post={post}/>)
        )}
      </div>
      <CreateUpdatePost show={showCreate} setShow={setShowCreate} post={null} />
    </div>
  )
}

export default PostsList
