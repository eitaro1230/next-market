import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import {
  DecodedType,
  ExtendedNextApiRequestAuth,
  ResMessageType,
} from "./types";

// JWT認証のシークレットキー
const secret_key = "nextmarket";

const auth = (handler: Function) => {
  return async (
    req: ExtendedNextApiRequestAuth,
    res: NextApiResponse<ResMessageType>
  ) => {
    // リクエストヘッダーからトークンを取得
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY4MDg4NTQzOSwiZXhwIjoxNjgwOTY4MjM5fQ.tmZRGJItpzp8J7WMJpqqrbmw5q9mGuX-qDkvY-YLlY0";
    // const token = await req.headers.authorization.split(" ")[1];

    if (req.method === "GET") {
      //////////////////////////////////////////////////
      // GETアクセスの場合何もしない
      //////////////////////////////////////////////////
      return handler(req, res);
    }

    if (!token) {
      //////////////////////////////////////////////////
      // トークンがない場合
      //////////////////////////////////////////////////
      return res.status(400).json({ message: "トークンがありません" });
    }

    try {
      //////////////////////////////////////////////////
      // トークンが有効な場合
      //////////////////////////////////////////////////
      const decoded = jwt.verify(token, secret_key);
      req.body.email = (decoded as DecodedType).email;
      return handler(req, res);
    } catch (err) {
      //////////////////////////////////////////////////
      // トークンが有効でない場合
      //////////////////////////////////////////////////
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
