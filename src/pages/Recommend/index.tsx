import React, { FC, useEffect, useState } from 'react'
import { getBannerRequest } from '@/services/comment'
import { Image, Swiper } from 'antd-mobile'
import { BannerList } from '@/pages/Recommend/types'

const Recommend: FC = function () {
  const [bannerList, setBannerList] = useState<BannerList[]>()
  useEffect(() => {
    getBannerRequest().then(data => {
      const {
        data: { banners }
      } = data
      setBannerList(banners)
    })
  }, [])

  return (
    <>
      <h1>个性推荐</h1>
      <Swiper
        autoplay
        loop
        style={{
          '--border-radius': '8px'
        }}
      >
        {bannerList?.map((value, index) => {
          return (
            <Swiper.Item key={index}>
              <div
                className={'swiperItem'}
                onClick={() => {
                  console.log(value.typeTitle)
                }}
              >
                <Image src={value.imageUrl} alt={value.typeTitle} />
              </div>
            </Swiper.Item>
          )
        })}
      </Swiper>
    </>
  )
}
export default Recommend
