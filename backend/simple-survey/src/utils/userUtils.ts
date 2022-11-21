import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

const userExists = async (email: string) => {
  const user = await userRepository.findOneBy({email: email});

  return !!user;
}

export { userExists }