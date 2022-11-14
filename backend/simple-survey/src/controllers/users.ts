import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
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

  const token: any = jwtDecode(req.body.jwt);
  const email = token.email;
  
  if (!email) return res.status(500);

  let retUser = {
    email: email,
    username: token.name,
    imageUrl: token.picture,
    userId: 0
  };

  if (await userExists(email)) {
    const user = await userRepository.findOneBy({
      email: email
    });

    retUser.userId = user!.id;

    // TODO: get user data here
  } else {
    const newUser = new User(email);
    await userRepository.save(newUser);

    // TODO: get user data here
  }

  // temp
  // const user = {
  //   email: email,
  //   username: token.name,
  //   imageUrl: token.picture
  // }

  return res.status(200).json(retUser);
}

export { getUser, loginUser };