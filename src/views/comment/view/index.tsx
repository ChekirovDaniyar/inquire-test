import React from "react"
import {IComment} from "../../../redux/reducers/types"

type Props = {
  comment: IComment
}

const CommentView: React.FC<Props> = ({comment}) => {
  return (
    <div className="border p-1 rounded my-1">
      <p><b>Author:</b> {comment.email}</p>
      <p><b>Name:</b> {comment.name}</p>
      <p>{comment.body}</p>
    </div>
  )
}

export default CommentView
