import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

const getUser = async (req: Request, res: Response) => {
  const users = {user: "test"};

  const newUser = new User("email@email.com");

  await userRepository.save(newUser);

  return res.status(200).json({users});
}

export { getUser };