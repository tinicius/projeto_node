import { Router } from 'express';

import multer from 'multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name, email, password,
  });

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    avatarFilename: request.file!.filename,
  });

  return response.json(user);
});

export default usersRouter;
