import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepositoryToken } from 'src/app.tokens';
import Company from 'src/domain/entities/company.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

export class GetCompanyByIdUseCaseInput {
  constructor(readonly id: number) {}
}

@Injectable()
export default class GetCompanyByIdUseCase
  implements IUseCase<GetCompanyByIdUseCaseInput, Company>
{
  constructor(
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(input: GetCompanyByIdUseCaseInput): Promise<Company> {
    const company = await this.companyRepository.findById(input.id);
    
    if (!company) {
      throw new NotFoundException(`Company with id ${input.id} not found`);
    }
    
    return company;
  }
}