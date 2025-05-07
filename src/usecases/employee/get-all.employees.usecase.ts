import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepositoryToken } from 'src/app.tokens';
import Employee from 'src/domain/entities/employee.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';

@Injectable()
export default class GetAllEmployeesUseCase implements IUseCase<void, Employee[]> {
  constructor(
    @Inject(EmployeeRepositoryToken)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async run(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }
}