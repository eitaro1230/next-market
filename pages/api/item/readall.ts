import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getAllItems = async (req: any, res: any) => {
  try {
    await connectDB();
    // items collectionsからすべて読み取り
    const allItems = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "アイテム読み取り成功(all)", allItems: allItems });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り失敗(all)" });
  }
};

export default getAllItems;
