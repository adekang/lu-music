import service from './request'
import { BannerList, Response, SongList } from '@/pages/Recommend/types'

// export const getBannerRequest = () => service.get<{ banners: BannerList[] }>('/banner')

/**
 * @param {*} params
 */
// export const getHotList = (params: { limit: number }) =>
//   service.get<{ result: SongList[] }>('/personalized', {
//     params
//   })

export const getBannerRequest = () => {
  return service({
    url: '/banner'
  })
}

export const getHotList = (data: { limit: number }) => {
  return service({
    url: '/personalized',
    data
  })
}

export const getNewSong = () => {
  return service({
    url: '/personalized/newsong'
  })
}

// 获取歌曲详情
// 必选参数 : ids: 音乐 id, 如 id=347230
export const getSingSongDetail = (data: { id: number }) => {
  return service({
    url: '/song/url',
    data
  })
}
