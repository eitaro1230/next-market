import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

const Login: NextPage = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  // ログインボタン押下時の動作
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // submitイベント発生時のデフォルトの動作を無効にする(ページのリロードを無効)
    e.preventDefault();

    try {
      // ユーザー登録
      fetch("${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          alert(data.message);
        });
    } catch (err) {
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <Head>
        <title>ログイン</title>
      </Head>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={loginUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={loginUser.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
