import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DecodedType } from "./types";

// JWT認証のシークレットキー
const secret_key = process.env.JWT_SECRET_KEY;

const useAuth = () => {
  const [loginUser, setLoginUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    // トークンを取得
    const token = localStorage.getItem("token");

    //////////////////////////////////////////////////
    // トークンがない場合(ログインしていない場合)
    //////////////////////////////////////////////////
    // ログイン画面へリダイレクト
    token || router.push("/user/login");

    try {
      //////////////////////////////////////////////////
      // トークンが有効な場合
      //////////////////////////////////////////////////
      const decoded = jwt.verify(token as string, secret_key!);
      setLoginUser((decoded as DecodedType).email);
    } catch (err) {
      //////////////////////////////////////////////////
      // トークンが有効でない場合
      //////////////////////////////////////////////////
      // ログイン画面へリダイレクト
      router.push("/user/login");
    }
  }, [router]);

  return loginUser;
};

export default useAuth;
