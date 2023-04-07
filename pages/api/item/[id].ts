import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";
import { ResReadSingleType, SavedItemDataType } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

const getSingleItem = async (
  req: NextApiRequest,
  res: NextApiResponse<ResReadSingleType>
) => {
  try {
    await connectDB();
    // MongoDBのidを指定してitems collectionsから1つだけ読み取り
    const singleItem: SavedItemDataType | null = await ItemModel.findById(
      req.query.id
    );

    if (!singleItem) {
      //////////////////////////////////////////////////
      // 指定したitemが存在しない場合
      //////////////////////////////////////////////////
      return res
        .status(400)
        .json({ message: "アイテムが存在していないため読み取り失敗" });
    }

    return res.status(200).json({
      message: "アイテム読み取り成功(single)",
      singleItem: singleItem,
    });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り失敗(single)" });
  }
};

export default getSingleItem;
