import { AppError } from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/user.Interface";
import { userSchemaResponse } from "../../schema/user.schema";

export const createdUserService = async (
  dataBody: IUserRequest
): Promise<IUser> => {
  const { addresses, reset_token, ...res } = dataBody;

  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const createUser = userRepository.create(res);
  await userRepository.save(createUser);

  const user = await userRepository.findOne({
    where: { email: dataBody.email },
  });

  const createAddres = addressRepository.create({
    ...addresses,
    user: user,
  });

  await addressRepository.save(createAddres);

  const returnUser = userSchemaResponse.parse(user);

  return returnUser;
};