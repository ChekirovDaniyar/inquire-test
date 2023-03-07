import React from "react"
import {useNavigate} from "react-router-dom"
import {Button, Col, Modal, ModalBody, Spinner} from "reactstrap"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch} from "../../../redux/store"
import {deletePost} from "../../../redux/reducers/posts"


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  id: number
}
const DeletePost: React.FC<Props> = ({show, setShow, id}) => {
  const { deleteLoading } = useSelector((state: any) => state.posts)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = async () => {
    await dispatch(deletePost({id}))
    navigate('/')
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)}>
      <ModalBody>
        <h3 className="text-center">Are you sure you want to delete post ?</h3>
        <Col className="text-center mt-1">
          <Button type="submit" color="primary" className="me-2" onClick={onSubmit}>
            {deleteLoading ? <Spinner size="sm"/> : 'Submit'}
          </Button>
          <Button type="reset" outline onClick={() => setShow(false)}>Cancel</Button>
        </Col>
      </ModalBody>
    </Modal>
  )
}

export default DeletePost
