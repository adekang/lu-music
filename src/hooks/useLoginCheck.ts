import { useEffect, useState } from "react";
import { getLocalStorage } from "@/services/utils";
import { changeLoginStates, changeUserInfo } from "@/store/loginSlice";
import Cookies from "js-cookie";
import { checkLogin } from "@/services/comment";
import { useAppDispatch } from "@/store";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const useLoginCheck = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    if (isLogin) {
      const profile = getLocalStorage("profile");
      if (profile === "undefined") return;
      dispatch(
        changeUserInfo({
          userId: profile.userId,
          nickname: profile.nickname,
          avatarUrl: profile.avatarUrl,
          vipType: profile.vipType
        })
      );
      dispatch(changeLoginStates(true));
    } else {
      dispatch(changeLoginStates(false));
    }
  }, [isLogin]);

  const loginCheck = () => {
    const cookieToken = Cookies.get("cookie");

    cookieToken &&
      checkLogin({ cookie: encodeURIComponent(cookieToken) })
        .then((data: any) => {
          if (data.data.code === 200) {
            setIsLogin(true);
          } else {
            Toast.show({
              position: "top",
              content: "用户还没有登录，请登录！"
            });
            navigate("/login");
          }
        })
        .catch((err: any) => {
          return err;
        });
  };

  return { isLogin };
};

export default useLoginCheck;
