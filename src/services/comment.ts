import service from "./request";
import { BannerList, Response, SongList } from "@/pages/Recommend/types";
import { categoryMap } from "@/services/utils";
// import { request } from "./request";

// export const checkMusic = (params: { id: number }) =>
//   request.get("/check/music", {
//     params
//   });
export const checkMusic = (data: { id: number }) =>
  service({
    url: "/check/music",
    data
  });

export const getHotList = (data: { limit: number }) => {
  return service({
    url: "/personalized",
    data
  });
};

export const getBannerRequest = () => {
  return service({
    url: "/banner"
  });
};

export const getRecommendListRequest = () => {
  return service({
    url: "/personalized"
  });
};

export const getHotSingerListRequest = (count: number) => {
  return service({
    url: `/top/artists?offset=${count}`
  });
};

export const getSingerListRequest = (category: string, alpha: string, count: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const { type, area } = !!category ? categoryMap.get(category) : {};
  const { type, area } = category ? categoryMap.get(category) : {};
  return service({
    url: `/artist/list?${
      type && area ? `type=${type}&area=${area}` : ""
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  });
};

export const getRankListRequest = () => {
  return service({
    url: `/toplist/detail`
  });
};

export const getAlbumDetailRequest = (id: number) => {
  return service({
    url: `/playlist/detail?id=${id}`
  });
};

export const getSingerInfoRequest = (id: string | undefined) => {
  return service({
    url: `/artists?id=${id}`
  });
};
//拼接出歌曲的url链接
// export const getSongUrl = (id: number) => {
//   return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
// };

//拼接出歌曲的url链接
export const getSongUrl = (id: number) => {
  return service({
    url: `/song/url?id=${id}`
  });
};

export const getLyricRequest = (id: number) => {
  return service({
    url: `/lyric?id=${id}`
  });
};

export const getHotKeyWordsRequest = () => {
  return service({
    url: `/search/hot`
  });
};

export const getSuggestListRequest = (query: string) => {
  return service({
    url: `/search/suggest?keywords=${query}`
  });
};

export const getResultSongsListRequest = (query: string) => {
  return service({
    url: `/search?keywords=${query}`
  });
};

export const getSongDetailRequest = (id: number) => {
  return service({
    url: `/song/detail?ids=${id}`
  });
};
