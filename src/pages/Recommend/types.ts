// 接口返回数据格式
export interface Data<T> {
  code: string;
  msg: string;
  status: number;
  success: boolean;
  data: T;
}

export interface BannerList {
  imageUrl: string;
  typeTitle: string;
}

export interface SongList {
  id: number;
  name: string;
  picUrl: string;
}

export type Response<D> = Promise<D>;
