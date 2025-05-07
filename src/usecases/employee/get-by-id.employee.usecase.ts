import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepositoryToken } from 'src/app.tokens';
import Employee from 'src/domain/entities/employee.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';

export class GetEmployeeByIdUseCaseInput {
  constructor(readonly id: number) {}
}

@Injectable()
export default class GetEmployeeByIdUseCase
  implements IUseCase<GetEmployeeByIdUseCaseInput, Employee>
{
  constructor(
    @Inject(EmployeeRepositoryToken)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async run(input: GetEmployeeByIdUseCaseInput): Promise<Employee> {
    const employee = await this.employeeRepository.findById(input.id);
    
    if (!employee) {
      throw new NotFoundException(`Employee with id ${input.id} not found`);
    }
    
    return employee;
  }
}