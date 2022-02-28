/**
 * @description node运行环境
 * @return "dev" | "prod"
 */
export const environmentVariable = () => {
  const env = import.meta.env.VITE_APP_ANT;
  let parps = null;
  switch (env) {
    case "dev": // 开发环境下
      parps = "dev";
      break;
    case "prod": // 正式生产环境下
      parps = "prod";
      break;
    default:
      parps = "dev";
      break;
  }
  return parps;
};

export const debounce = function (func: any, delay: number): any {
  let timer: number | undefined;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

// 歌手种类
export const categoryTypes = [
  {
    name: "华语男",
    key: "1001"
  },
  {
    name: "华语女",
    key: "1002"
  },
  {
    name: "华语组合",
    key: "1003"
  },
  {
    name: "欧美男",
    key: "2001"
  },
  {
    name: "欧美女",
    key: "2002"
  },
  {
    name: "欧美组合",
    key: "2003"
  },
  {
    name: "日本男",
    key: "6001"
  },
  {
    name: "日本女",
    key: "6002"
  },
  {
    name: "日本组合",
    key: "6003"
  },
  {
    name: "韩国男",
    key: "7001"
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  }
];

// 歌手首字母
export const alphaTypes = [
  {
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

export const categoryMap = new Map([
  ["1001", { type: 1, area: 7 }],
  ["1002", { type: 2, area: 7 }],
  ["1003", { type: 3, area: 7 }],
  ["2001", { type: 1, area: 96 }],
  ["2002", { type: 2, area: 96 }],
  ["2003", { type: 3, area: 96 }],
  ["6001", { type: 1, area: 8 }],
  ["6002", { type: 2, area: 8 }],
  ["6003", { type: 3, area: 8 }],
  ["7001", { type: 1, area: 16 }],
  ["7002", { type: 2, area: 16 }],
  ["7003", { type: 3, area: 16 }],
  ["4001", { type: 1, area: 0 }],
  ["4002", { type: 2, area: 0 }],
  ["4003", { type: 3, area: 0 }]
]);

//顶部的高度
export const HEADER_HEIGHT = 45;

// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};

// 处理歌手列表拼接歌手名字
export const getName = (list: { name: string }[]) => {
  let str = "";
  list.map((item: { name: string }, index: number) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//判断一个对象是否为空
export const isEmptyObject = (obj: any) => !obj || Object.keys(obj).length === 0;

// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
const elementStyle = document.createElement("div").style;

const vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };
  for (let key in transformNames) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style: any) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

//转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0; // |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: any[]) {
  const new_arr: any[] = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song: { id: any }, list: any[]) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
};
//拼接出歌曲的url链接
export const getSongUrl = (id: any) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

//除去手机号码的空格符号
export const trimPhone = (val: string) => val.replace(/(^\s+)|(\s+$)|\s+/g, "");
