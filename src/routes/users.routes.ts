import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const createdUser = Object.assign(Object.create(user), {
      name,
      email,
    });

    return res.json(createdUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file?.filename,
      });

      const updatedUser = Object.assign(user);
      delete updatedUser.password;

      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
);

export default usersRouter;
