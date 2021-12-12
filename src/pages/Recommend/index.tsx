import React, { FC, useEffect, useState } from 'react'
import { getBannerRequest, getHotList } from '@/services/comment'
import { Image, Swiper } from 'antd-mobile'
import { BannerList, SongList } from '@/pages/Recommend/types'
import styles from './recommend.module.scss'

const Recommend: FC = function () {
  const [bannerList, setBannerList] = useState<BannerList[]>()
  const [songList, setSongList] = useState<SongList[]>()
  useEffect(() => {
    getBannerRequest()
      .then(data => {
        const { banners } = data
        setBannerList(banners)
      })
      .catch(e => {
        console.log(e)
      })
    getHotList({
      limit: 10
    })
      .then((data: any) => {
        console.log('data::', data)

        const { result } = data
        setSongList(result)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  console.log(songList)

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

      <section>
        <h1 className={styles.title}>推荐歌单{'>>'}</h1>
        <div className={styles.songListWrapper}>
          {songList?.map(value => {
            return (
              <div className={styles.songList} key={value.id}>
                <Image src={value.picUrl} style={{ width: 105, height: 105 }} />
                <p>{value.name}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
export default Recommend
