export class ResponseDto<T> {
  constructor(public success: boolean, message: string, public data: T) {}
}
