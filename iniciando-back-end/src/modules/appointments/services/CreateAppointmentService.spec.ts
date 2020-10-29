import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateAppoinmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppoinmentService = new CreateAppoinmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppoinmentService.execute({
      date: new Date(),
      provider_id: '1213151',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1213151');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppoinmentService = new CreateAppoinmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppoinmentService.execute({
      date: appointmentDate,
      provider_id: '1213151',
    });

    expect(
      createAppoinmentService.execute({
        date: appointmentDate,
        provider_id: '1213151',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
