export interface IComment {
  id: number,
  postId: number,
  email: string,
  body: string,
  name: string
}

export interface IPost {
  id: number,
  title: string,
  body: string,
  comments: Array<IComment>
}

export interface ICreateComment {
  postId: number,
  name: string,
  email: string,
  body: string
}

export interface IInitialState {
  data: Array<IPost>,
  selectedPost: IPost | null,
  loading: boolean,
  commentLoading: boolean,
  createLoading: boolean,
  deleteLoading: boolean
}
