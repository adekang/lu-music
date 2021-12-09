import service from './request'

export const getBannerRequest = () => service.get<{ banners: string[] }>('/banner')

export const getRecommendListRequest = () => service.get('/personalized')
