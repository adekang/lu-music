import { useEffect, useState } from "react";
import { getLocalStorage } from "@/services/utils";
import { changeLoginStates, changeUserInfo } from "@/store/loginSlice";
import Cookies from "js-cookie";
import { checkLogin } from "@/services/comment";
import { RootState, useAppDispatch } from "@/store";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useLoginCheck = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo, loginStates } = useSelector((state: RootState) => state.login);

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
    }
  }, [isLogin]);

  const loginCheck = () => {
    const cookieToken = Cookies.get("cookie");
    console.log("loginCheck::>", cookieToken);

    if (cookieToken !== undefined) {
      dispatch(changeLoginStates(true));
      setIsLogin(true);
    } else {
      Toast.show({
        position: "top",
        content: "用户还没有登录，请登录！"
      });
      navigate("/login");
    }

    // const token = cookieToken ? cookieToken : 1;
    // checkLogin({ cookie: encodeURIComponent(token) })
    // .then((data: any) => {
    // console.log("data::", data);
    //   if (data.data.account !== null) {
    //     dispatch(changeLoginStates(true));
    //     setIsLogin(true);
    //   } else {
    //     Toast.show({
    //       position: "top",
    //       content: "用户还没有登录，请登录！"
    //     });
    //     navigate("/login");
    //   }
    // })
    // .catch((err: any) => {
    // dispatch(changeLoginStates(false));
    // return err;
    // });
  };

  return { loginCheck };
};

export default useLoginCheck;
