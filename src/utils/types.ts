export interface FetchArgs {
  url: string,
  params?: any,
  body?: object | null,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}
