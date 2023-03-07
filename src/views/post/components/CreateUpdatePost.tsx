import React from "react";
import {Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner} from "reactstrap"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"

import {AppDispatch} from "../../../redux/store"
import {createPost, updatePost} from "../../../redux/reducers/posts"
import {IPost} from "../../../redux/reducers/types"


type Props = {
  show: boolean,
  setShow: (show: boolean) => void,
  post: IPost | null
}

type FormValues = {
  title: string,
  body: string
}

const defaultValues: FormValues = {
  title: '',
  body: ''
}

const CreateUpdatePost: React.FC<Props> = ({ show, setShow, post }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid}
  } = useForm<FormValues>({defaultValues, mode: 'onSubmit'})

  const {createLoading} = useSelector((state: any) => state.posts)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isValid) {
      const action = post ? updatePost : createPost
      await dispatch(action({...post ? {id: post.id} : {}, ...data})).unwrap()
      setShow(false)
    }
  }

  const resetFormOnOpen = () => {
    if (post) reset({title: post.title, body: post.body})
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} onOpened={resetFormOnOpen}>
      <ModalHeader toggle={() => setShow(!show)}>{!!post ? 'Update' : 'Create'} Post</ModalHeader>
      <ModalBody>
        <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label>Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{required: true}}
              render={({field}) => (
                <Input {...field} invalid={!!errors.title} />
              )}
            />
            {!!errors.title && <FormFeedback>Title is required!</FormFeedback>}
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
              {createLoading ? <Spinner size="sm"/> : 'Submit'}
            </Button>
            <Button type="reset" outline onClick={() => setShow(false)}>Cancel</Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default CreateUpdatePost
