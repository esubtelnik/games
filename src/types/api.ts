export interface IApiResponse<T> {
   data: T | null;
   successful: boolean;
   error: {
      message: string;
   } | null;
}
