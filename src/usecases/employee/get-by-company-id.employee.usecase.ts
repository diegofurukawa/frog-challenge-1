// src/usecases/employee/get-by-company-id.employee.usecase.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepositoryToken, EmployeeRepositoryToken } from 'src/app.tokens';
import Employee from 'src/domain/entities/employee.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';

export class GetEmployeesByCompanyIdUseCaseInput {
  constructor(readonly companyId: number) {}
}

@Injectable()
export default class GetEmployeesByCompanyIdUseCase
  implements IUseCase<GetEmployeesByCompanyIdUseCaseInput, Employee[]>
{
  constructor(
    @Inject(EmployeeRepositoryToken)
    private readonly employeeRepository: IEmployeeRepository,
    
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(input: GetEmployeesByCompanyIdUseCaseInput): Promise<Employee[]> {
    // First verify if company exists
    const company = await this.companyRepository.findById(input.companyId);
    
    if (!company) {
      throw new NotFoundException(`Company with id ${input.companyId} not found`);
    }
    
    // Find employees with the specified company ID
    return this.employeeRepository.findByCompanyId(input.companyId);
  }
}