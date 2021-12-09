import React, { FC, useEffect, useState } from 'react'
import { Button } from 'antd-mobile'
import { getBannerRequest } from '@/services/comment'

const Recommend: FC = function () {
  const [bannerList, setBannerList] = useState<string[]>()
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
      <div>Recommend</div>
      <h1>123</h1>
      <span>{JSON.stringify(bannerList)}</span>
      <Button>Commend</Button>
    </>
  )
}
export default Recommend
