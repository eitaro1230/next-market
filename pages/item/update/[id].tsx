import useAuth from "@/utils/useAuth";
import Head from "next/head";
import { useState } from "react";

const UpdateItem = (props: any) => {
  const [updateItem, setUpdateItem] = useState({
    title: props.singleItem.title,
    price: props.singleItem.price,
    image: props.singleItem.image,
    description: props.singleItem.description,
  });

  const handleChange = (e: any) => {
    setUpdateItem({
      ...updateItem,
      [e.target.name]: e.target.value,
    });
  };

  // 編集ボタン押下時の動作
  const handleSubmit = (e: any) => {
    // submitイベント発生時のデフォルトの動作を無効にする(ページのリロードを無効)
    e.preventDefault();

    try {
      // アイテム編集
      fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/item/update/${props.singleItem._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updateItem),
        }
      )
        .then((res) => res.json())
        .then((data) => alert(data.message));
    } catch (err) {
      alert("アイテム編集失敗");
    }
  };

  // ログイン&権限チェック
  const loginUser = useAuth();

  if (loginUser === props.singleItem.email) {
    return (
      <div>
        <Head>
          <title>アイテム編集</title>
        </Head>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={updateItem.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={updateItem.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={updateItem.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={updateItem.description}
            onChange={handleChange}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;

// SSR
export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/item/${context.query.id}`
  );
  const singleItem = await res.json();
  return { props: singleItem };
};
