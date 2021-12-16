import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import User from "../models/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrent email or password", 401);
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new AppError("Incorrent email or password", 401);
    }

    const token = sign({}, `${process.env.SESSION_SECRET}`, {
      subject: user.id,
      expiresIn: `${process.env.SESSION_EXPIRATION}`,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
