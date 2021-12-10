import service from './request'
import { BannerList } from '@/pages/Recommend/types'

export const getBannerRequest = () => service.get<{ banners: BannerList[] }>('/banner')

export const getRecommendListRequest = () => service.get('/personalized')
