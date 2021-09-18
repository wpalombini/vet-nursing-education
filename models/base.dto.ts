export class BaseResponseDto<T> {
  constructor(public success: boolean, message: string, public data: T) {}
}
