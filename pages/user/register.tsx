import Head from "next/head";
import { useState } from "react";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // 登録ボタン押下時の動作
  const handleSubmit = (e: any) => {
    // submitイベント発生時のデフォルトの動作を無効にする(ページのリロードを無効)
    e.preventDefault();

    try {
      // ユーザー登録
      fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message));
    } catch (err) {
      alert("ユーザー登録失敗");
    }
  };

  return (
    <div>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newUser.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
        <input
          value={newUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={newUser.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
