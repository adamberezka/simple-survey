import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { AppDataSource } from "../data-source";
import { User, UserRole } from "../entities/User";
import { loginLogger, readLogs } from "../utils/loggerUtils";
import { userExists } from "../utils/userUtils";

const userRepository = AppDataSource.getRepository(User);

const getUser = async (req: Request, res: Response) => {
  console.log(req);
  
  const users = {user: "test"};

  const newUser = new User("email@email.com");

  await userRepository.save(newUser);

  return res.status(200).json({users});
}

const loginUser = async (req: Request, res: Response) => {

  const token: any = jwtDecode(req.body.jwt);
  const email = token.email;
  
  if (!email) return res.status(500);

  let retUser = {
    email: email,
    username: token.name,
    imageUrl: token.picture,
    userId: 0,
    isAdmin: false
  };

  if (await userExists(email)) {
    const user = await userRepository.findOneBy({
      email: email
    });

    retUser.userId = user!.id;
    retUser.isAdmin = user!.role === UserRole.ADMIN;
  } else {
    const newUser = new User(email);
    await userRepository.save(newUser);
  }

  loginLogger.log('info', `Successfull user log in: email: ${retUser.email}, name: ${retUser.username}, id: ${retUser.userId}`);
  return res.status(200).json(retUser);
}

const getLogs = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await readLogs(req.body.from, req.body.to, req.body.allLogs ? './default-logs' : './login-logs'));
  } catch (error) {
    return res.status(500).json({error});
  }
}

export { getUser, loginUser, getLogs };