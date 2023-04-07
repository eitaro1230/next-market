import jwt from "jsonwebtoken";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

// JWT認証のシークレットキー
const secret_key = "nextmarket";

const loginUser = async (req: any, res: any) => {
  try {
    await connectDB();
    // users collectionsからメールアドレスをキーに1つユーザーを取得
    const savedUserData = await UserModel.findOne({ email: req.body.email });

    if (!savedUserData) {
      //////////////////////////////////////////////////
      // ユーザーデータが存在しない場合の処理
      //////////////////////////////////////////////////
      return res
        .status(400)
        .json({ message: "ログイン失敗：ユーザーを登録してください" });
    }

    if (req.body.password !== savedUserData.password) {
      //////////////////////////////////////////////////
      // パスワードが間違っている場合の処理
      //////////////////////////////////////////////////
      return res
        .status(400)
        .json({ message: "ログイン失敗：パスワードが間違っています" });
    }
    //////////////////////////////////////////////////
    // パスワードが正しい場合の処理
    //////////////////////////////////////////////////
    const payload = { email: req.body.email };
    // JWTトークン発行
    const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
    return res.status(200).json({ message: "ログイン成功", token: token });
  } catch (err) {
    return res.status(400).json({ message: "ログイン失敗" });
  }
};

export default loginUser;
