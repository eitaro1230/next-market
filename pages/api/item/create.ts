import auth from "../../../utils/auth";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const createItem = async (req: any, res: any) => {
  try {
    await connectDB();
    // items collectionsへ書き込み
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "アイテム作成" });
  } catch (err) {
    return res.status(400).json({ message: "アイテム作成失敗" });
  }
};

export default auth(createItem);
