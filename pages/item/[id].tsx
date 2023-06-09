import { ReadSingleDateType } from "@/utils/types";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ReadSingleItem: NextPage<ReadSingleDateType> = (props) => {
  return (
    <div className="grid-container-si">
      <Head>
        <title>{props.singleItem.title}</title>
      </Head>
      <div>
        <Image
          src={props.singleItem.image}
          height={500}
          width={750}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          alt="item-image"
        ></Image>
      </div>
      <div>
        <h1>{props.singleItem.title}</h1>
        <h2>¥{props.singleItem.price}</h2>
        <hr />
        <p>{props.singleItem.description}</p>
        <div>
          <Link href={`/item/update/${props.singleItem._id}`}>
            アイテム編集
          </Link>
          <Link href={`/item/delete/${props.singleItem._id}`}>
            アイテム削除
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;

// SSR
export const getServerSideProps: GetServerSideProps<
  ReadSingleDateType
> = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/item/${context.query.id}`
  );
  const singleItem = await res.json();
  return { props: singleItem };
};
