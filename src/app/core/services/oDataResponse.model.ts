export interface IODataResponse {
  '@odata.context'?: string;
}

export interface IODataValueResponse<T> extends IODataResponse {
  value: T;
}
