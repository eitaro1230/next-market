import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ReadAllItems = (props: any) => {
  return (
    <div>
      <Head>
        <title>Next Market</title>
      </Head>
      <div className="grid-container-in">
        {props.allItems.map((item: any) => (
          <Link href={`/item/${item._id}`} key={item._id}>
            <div className="card">
              <Image
                src={item.image}
                height={500}
                width={750}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt="item-image"
              ></Image>
              <div className="texts-area">
                <h2>¥{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0, 80)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadAllItems;

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/item/readall`
  );
  const allItems = await res.json();
  return { props: allItems };
};
