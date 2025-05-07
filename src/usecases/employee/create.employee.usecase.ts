import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateEmployeeUseCaseInput from './input/create.employee.usecase.input';
import CreateEmployeeUseCaseOutput from './output/create.employee.usecase.output';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepositoryToken, EmployeeRepositoryToken } from 'src/app.tokens';
import IEmployeeRepository from 'src/domain/interfaces/repositories/employee.repository.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class CreateEmployeeUseCase
  implements IUseCase<CreateEmployeeUseCaseInput, CreateEmployeeUseCaseOutput>
{
  constructor(
    @Inject(EmployeeRepositoryToken)
    private readonly employeeRepository: IEmployeeRepository,
    
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(
    input: CreateEmployeeUseCaseInput,
  ): Promise<CreateEmployeeUseCaseOutput> {
    // Check if company exists
    const company = await this.companyRepository.findById(input.companyId);
    if (!company) {
      throw new BadRequestException('Company not found');
    }

    // Validate employee age (must be at least 18 years old)
    const birthDate = new Date(input.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      if (age - 1 < 18) {
        throw new BadRequestException('Employee is under 18 years old');
      }
    } else if (age < 18) {
      throw new BadRequestException('Employee is under 18 years old');
    }

    return this.employeeRepository.create({
      ...input,
    });
  }
}