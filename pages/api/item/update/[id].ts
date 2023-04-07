import auth from "../../../../utils/auth";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

const updateItem = async (req: any, res: any) => {
  try {
    await connectDB();
    // MongoDBのidを指定してitems collectionsから編集対象itemを取得
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
    // MongoDBのidを指定してitems collectionsから1つだけ編集
    await ItemModel.updateOne({ _id: req.query.id }, req.body);
    return res.status(200).json({ message: "アイテム編集成功" });
  } catch (err) {
    return res.status(400).json({ message: "アイテム編集失敗" });
  }
};

export default auth(updateItem);
