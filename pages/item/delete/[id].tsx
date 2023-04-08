import useAuth from "@/utils/useAuth";
import Head from "next/head";
import Image from "next/image";

const DeleteItem = (props: any) => {
  // 削除ボタン押下時の動作
  const handleSubmit = (e: any) => {
    // submitイベント発生時のデフォルトの動作を無効にする(ページのリロードを無効)
    e.preventDefault();

    try {
      // アイテム削除
      fetch(
        `next-market-nine.vercel.app/api/item/delete/${props.singleItem._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => alert(data.message));
    } catch (err) {
      alert("アイテム削除失敗");
    }
  };

  // ログイン&権限チェック
  const loginUser = useAuth();

  if (loginUser === props.singleItem.email) {
    return (
      <div className="delete-page">
        <Head>
          <title>アイテム削除</title>
        </Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <Image
            src={props.singleItem.image}
            height={500}
            width={750}
            alt="item-image"
          ></Image>
          <h3>¥{props.singleItem.price}</h3>
          <p>{props.singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;

// SSR
export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `next-market-nine.vercel.app/api/item/${context.query.id}`
  );
  const singleItem = await res.json();
  return { props: singleItem };
};
