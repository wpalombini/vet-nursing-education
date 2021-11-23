export class ResponseDto<T> {
  constructor(public success: boolean, public message: string, public data: T) {}
}
