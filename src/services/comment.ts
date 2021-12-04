import service from './request'

export const getBannerRequest = () => service.get('/banner')

export const getRecommendListRequest = () => service.get('/personalized')
