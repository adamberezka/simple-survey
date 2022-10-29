import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  const users = {user: "test"};
  return res.status(200).json({users});
}

export { getUser };