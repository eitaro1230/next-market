import { Types } from "mongoose";
import type { NextApiRequest } from "next";

//////////////////////////////////////////////////
// schemaModels.tsの型
//////////////////////////////////////////////////
// itemの型
export interface ItemDataType {
  title: String;
  image: String;
  price: String;
  description: String;
  email: String;
}

// userの型
export interface UserDataType {
  name: string;
  email: string;
  password: string;
}

//////////////////////////////////////////////////
// auth.tsの型
//////////////////////////////////////////////////
// JWTトークンをデコードしたときの型
export interface DecodedType {
  email: string;
}

// リクエストボディの型
export interface ExtendedNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string;
  };
  body: {
    email: string;
  };
}

//////////////////////////////////////////////////
// Common
//////////////////////////////////////////////////
// レスポンスボディの型
export interface ResMessageType {
  message: string;
  token?: string;
}

//////////////////////////////////////////////////
// register.ts, login.tsの型
//////////////////////////////////////////////////
// リクエストボディの型
export interface ExtendedNextApiRequestUser extends NextApiRequest {
  body: UserDataType;
}

export interface SavedUserDataType extends UserDataType {
  _id: Types.ObjectId;
}

//////////////////////////////////////////////////
// readall.ts, [id].ts, update/[id].ts, delete/[id].tsの型
//////////////////////////////////////////////////
// リクエストボディの型
export interface SavedItemDataType extends UserDataType {
  _id: Types.ObjectId;
}

//////////////////////////////////////////////////
// readall.tsのみの型
//////////////////////////////////////////////////
export interface ResReadAllType {
  message: string;
  allItems?: SavedItemDataType[];
}

//////////////////////////////////////////////////
// create.tsのみの型
//////////////////////////////////////////////////
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType;
}

//////////////////////////////////////////////////
// [id].tsのみの型
//////////////////////////////////////////////////
export interface ResReadSingleType {
  message: string;
  singleItem?: SavedItemDataType;
}
