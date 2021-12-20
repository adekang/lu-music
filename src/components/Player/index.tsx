import React, { FC, useState } from 'react'

interface Props {
  playing: boolean
  currentSong: string
  currentIndex: number
  playList: unknown[]
  mode: string
  sequencePlayList: string[]
  fullScreen: boolean
}

const Player: (props: Props) => void = props => {
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  //歌曲总时长
  const [duration, setDuration] = useState(0)
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const {
    playing,
    currentSong: immutableCurrentSong,
    currentIndex,
    playList: immutablePlayList,
    mode, //播放模式
    sequencePlayList: immutableSequencePlayList, //顺序列表
    fullScreen
  } = props
}

export default Player
