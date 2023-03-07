import React from "react"
import {Card, CardBody, CardFooter, CardText, CardTitle} from "reactstrap"
import {Link} from "react-router-dom"

import {IPost} from '../../../redux/reducers/types'


type Props = {
  post: IPost
}
const PostCard: React.FunctionComponent<Props> = ({post}) => {
  return (
    <Card style={{width: '18rem'}} className="mb-2" outline>
      <CardBody>
        <CardTitle tag="h5">{post.title}</CardTitle>
        <CardText>{post.body}</CardText>
        <CardFooter>
          <Link to={`/posts/${post.id}`} >View Detail</Link>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default PostCard
