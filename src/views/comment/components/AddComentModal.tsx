import React from "react"
import {Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner} from "reactstrap"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch} from "../../../redux/store"
import {createComment} from "../../../redux/reducers/posts"

type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  postId: number
}

type FormValues = {
  email: string,
  name: string,
  body: string
}

const defaultValues: FormValues = {
  email: '',
  name: '',
  body: ''
}

const AddCommentModal: React.FC<Props> = ({show, setShow, postId}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<FormValues>({defaultValues, mode: 'onSubmit'})

  const {commentLoading} = useSelector((state: any) => state.posts)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isValid) {
      await dispatch(createComment({...data, postId})).unwrap()
      setShow(false)
    }
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)}>
      <ModalHeader toggle={() => setShow(!show)}>Add Comment</ModalHeader>
      <ModalBody>
        <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label>Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{required: true}}
              render={({field}) => (
                <Input {...field} invalid={!!errors.name} />
              )}
            />
            {!!errors.name && <FormFeedback>Name is required!</FormFeedback>}
          </Col>

          <Col xs={12}>
            <Label>Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/}}
              render={({field}) => (
                <Input {...field} invalid={!!errors.email} />
              )}
            />
            {!!errors.email && <FormFeedback>Value must be email!</FormFeedback>}
          </Col>

          <Col xs={12}>
            <Label>Body</Label>
            <Controller
              name="body"
              control={control}
              rules={{required: true}}
              render={({field}) => (
                <Input {...field} invalid={!!errors.body} />
              )}
            />
            {!!errors.body && <FormFeedback>Body is required!</FormFeedback>}
          </Col>

          <Col className="text-center mt-1">
            <Button type="submit" color="primary" className="me-2">
              {commentLoading ? <Spinner size="sm"/> : 'Submit'}
            </Button>
            <Button type="reset" outline onClick={() => setShow(false)}>Cancel</Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default AddCommentModal
