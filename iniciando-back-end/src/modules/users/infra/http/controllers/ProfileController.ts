import { Request as Resquest, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Resquest, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(
    request: Resquest,
    response: Response,
  ): Promise<Response> {
    const { name, email, old_password, password } = request.body;
    const user_id = request.user.id;

    const UpdateProfile = container.resolve(UpdateProfileService);

    const user = await UpdateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
