import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepositoryToken } from 'src/app.tokens';
import Company from 'src/domain/entities/company.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import ICompanyRepository from 'src/domain/interfaces/repositories/company.repository.interface';

@Injectable()
export default class GetAllCompaniesUseCase implements IUseCase<void, Company[]> {
  constructor(
    @Inject(CompanyRepositoryToken)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }
}