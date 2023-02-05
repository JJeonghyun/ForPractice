declare type TError<R> = {
  isError: true;
  msg: R;
};
declare type TValue<T> = {
  isError: false;
  value: T;
};
declare type TResult<T, R> = TValue<T> | TError<R>;
