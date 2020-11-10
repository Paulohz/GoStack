import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateAppoinmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppoinmentService: CreateAppoinmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppoinmentService = new CreateAppoinmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppoinmentService.execute({
      date: new Date(),
      provider_id: '1213151',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1213151');
  });

  it('should not be able to create two appointments on the same time', async () => {
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
