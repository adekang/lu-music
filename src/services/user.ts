import service from "./request";
import { getCookie } from "@/services/utils";

const cookie = getCookie("cookie");

/**
 * 获取用户的收藏，歌单，喜欢信息（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的专辑
 * - uid: 用户 id
 * - limit : 返回数量 , 默认为 25
 * @param {Object} data
 * @param {number} data.uid
 * @param {number=} data.limit
 */
export const getSubCountInfo = (data?: { uid?: number; limit: number }) =>
  service({
    url: "/user/subcount",
    data: {
      cookie,
      ...data
    }
  });

/**
 * 获取收藏的专辑（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的专辑
 * - limit : 返回数量 , 默认为 25
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认为 0
 * @param {Object} data
 * @param {number} data.limit
 * @param {number=} data.offset
 * @param {number=} data.cookie
 */
export function getLikedAlbums(data: { limit: number }) {
  return service({
    url: "/album/sublist",
    data: {
      timestamp: new Date().getTime(),
      cookie,
      ...data
    }
  });
}

/**
 * 喜欢音乐列表（需要登录）
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * - uid: 用户 id
 * @param {number} uid
 */
export function getUserLikedSongsIDs(uid: number) {
  return service({
    url: "/likelist",
    data: {
      uid,
      cookie,
      timestamp: new Date().getTime()
    }
  });
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {number} data.uid
 * @param {number=} data.limit
 * @param {number=} data.offset
 * @param data
 */
export function getUserPlaylist(data: { uid: number; limit?: number; offset?: number }) {
  const timestamp = new Date().getTime();
  return service({
    url: "/user/playlist",
    data: {
      timestamp,
      cookie,
      ...data
    }
  });
}
