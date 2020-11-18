import { Request as Resquest, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(
    request: Resquest,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
