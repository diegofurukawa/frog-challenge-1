// src/controllers/company.controller.ts
import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { 
  CreateCompanyUseCaseToken, 
  GetAllCompaniesUseCaseToken,
  GetCompanyByIdUseCaseToken,
  GetEmployeesByCompanyIdUseCaseToken
} from 'src/app.tokens';
import Company from 'src/domain/entities/company.entity';
import Employee from 'src/domain/entities/employee.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateCompanyUseCaseInput from 'src/usecases/company/input/create.company.usecase.input';
import CreateCompanyUseCaseOutput from 'src/usecases/company/output/create.company.usecase.output';
import CreateCompanyInputDto from './input/create.company.input.dto';
import CreateCompanyOutputDto from './output/create.company.output.dto';
import { GetCompanyByIdUseCaseInput } from 'src/usecases/company/get-by-id.company.usecase';
import { GetEmployeesByCompanyIdUseCaseInput } from 'src/usecases/employee/get-by-company-id.employee.usecase';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CreateCompanyUseCaseToken)
    private readonly createCompanyUseCase: IUseCase<
      CreateCompanyUseCaseInput,
      CreateCompanyUseCaseOutput
    >,
    
    @Inject(GetAllCompaniesUseCaseToken)
    private readonly getAllCompaniesUseCase: IUseCase<void, Company[]>,
    
    @Inject(GetCompanyByIdUseCaseToken)
    private readonly getCompanyByIdUseCase: IUseCase<
      GetCompanyByIdUseCaseInput,
      Company
    >,
    
    @Inject(GetEmployeesByCompanyIdUseCaseToken)
    private readonly getEmployeesByCompanyIdUseCase: IUseCase<
      GetEmployeesByCompanyIdUseCaseInput,
      Employee[]
    >,
  ) {}

  @Post()
  async createCompany(
    @Body() input: CreateCompanyInputDto,
  ): Promise<CreateCompanyOutputDto> {
    const useCaseInput = input.toUseCaseInput();
    const useCaseOutput = await this.createCompanyUseCase.run(useCaseInput);
    return CreateCompanyOutputDto.fromUseCaseOutput(useCaseOutput);
  }
  
  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.getAllCompaniesUseCase.run();
  }
  
  @Get(':id')
  async getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.getCompanyByIdUseCase.run(new GetCompanyByIdUseCaseInput(id));
  }
  
  @Get(':id/employees')
  async getEmployeesByCompanyId(@Param('id', ParseIntPipe) id: number): Promise<Employee[]> {
    return this.getEmployeesByCompanyIdUseCase.run(new GetEmployeesByCompanyIdUseCaseInput(id));
  }
}