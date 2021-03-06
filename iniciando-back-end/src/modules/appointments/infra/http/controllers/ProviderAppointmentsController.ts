import { Request as Resquest, Response } from 'express';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Resquest, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
