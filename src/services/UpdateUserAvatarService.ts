import fs from "fs";
import { resolve } from "path";
import { getRepository } from "typeorm";

import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";
import User from "../models/User";

interface IRequest {
  user_id: string;
  avatarFilename?: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);
    if (!avatarFilename) throw new Error("User needs to upload an avatar");

    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError("User needs to be authenticated to change the avatar", 401);
    }

    if (user.avatar) {
      // Delete previous avatar

      const userAvatarFilePath = resolve(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
