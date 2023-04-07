import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModels";
import { ResReadAllType, SavedItemDataType } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

const getAllItems = async (
  req: NextApiRequest,
  res: NextApiResponse<ResReadAllType>
) => {
  try {
    await connectDB();
    // items collectionsからすべて読み取り
    const allItems: SavedItemDataType[] = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "アイテム読み取り成功(all)", allItems: allItems });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り失敗(all)" });
  }
};

export default getAllItems;
