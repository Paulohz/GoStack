import { Request as Resquest, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import { container } from 'tsyringe';

export default class AppointmentsController {
  public async index(request: Resquest, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
