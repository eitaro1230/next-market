import auth from "../../../../utils/auth";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

const deleteItem = async (req: any, res: any) => {
  try {
    await connectDB();
    // MongoDBのidを指定してitems collectionsから削除対象itemを取得
    const singleItem = await ItemModel.findById(req.query.id);

    if (singleItem.email !== req.body.email) {
      //////////////////////////////////////////////////
      // ログインユーザーととアイテム作成ユーザーが異なる場合
      //////////////////////////////////////////////////
      throw new Error();
    }

    //////////////////////////////////////////////////
    // ログインユーザーととアイテム作成ユーザーが同じ場合
    //////////////////////////////////////////////////
    // MongoDBのidを指定してitems collectionsから1つだけ削除
    await ItemModel.deleteOne({ _id: req.query.id });
    return res.status(200).json({ message: "アイテム削除成功" });
  } catch (err) {
    return res.status(400).json({ message: "アイテム削除失敗" });
  }
};

export default auth(deleteItem);
