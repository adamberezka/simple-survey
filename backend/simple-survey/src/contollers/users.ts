import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { userExists } from "../utils/userUtils";

const userRepository = AppDataSource.getRepository(User);

const getUser = async (req: Request, res: Response) => {
  console.log(req);
  
  const users = {user: "test"};

  const newUser = new User("email@email.com");

  await userRepository.save(newUser);

  return res.status(200).json({users});
}

const loginUser = async(req: Request, res: Response) => {

  if(await userExists(req.body.email)) {
    // TODO: get user data here
  } else {
    const newUser = new User(req.body.email);
    await userRepository.save(newUser);

    // TODO: get user data here
  }

  return res.status(200).redirect("/main-page");
}

export { getUser, loginUser };