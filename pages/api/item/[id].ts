import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getSingleItem = async (req: any, res: any) => {
  try {
    await connectDB();
    // MongoDBのidを指定してitems collectionsから1つだけ読み取り
    const singleItem = await ItemModel.findById(req.query.id);
    return res.status(200).json({
      message: "アイテム読み取り成功(single)",
      singleItem: singleItem,
    });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り失敗(single)" });
  }
};

export default getSingleItem;
