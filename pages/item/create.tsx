import useAuth from "@/utils/useAuth";
import Head from "next/head";
import { useState } from "react";

const CreateItem = () => {
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  // 作成ボタン押下時の動作
  const handleSubmit = (e: any) => {
    // submitイベント発生時のデフォルトの動作を無効にする(ページのリロードを無効)
    e.preventDefault();

    try {
      // アイテム登録
      fetch("next-market-nine.vercel.app/api/item/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message));
    } catch (err) {
      alert("アイテム作成失敗");
    }
  };

  // ログインチェック
  const loginUser = useAuth();

  if (loginUser) {
    return (
      <div>
        <Head>
          <title>アイテム作成</title>
        </Head>
        <h1 className="page-title">アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={newItem.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={newItem.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={newItem.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={newItem.description}
            onChange={handleChange}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
