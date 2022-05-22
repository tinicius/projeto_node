import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const auhenticateUser = new AuthenticationUserService();

  const { user, token } = await auhenticateUser.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
