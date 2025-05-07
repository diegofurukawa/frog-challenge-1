import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { EmployeeController } from './controllers/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './domain/entities/company.entity';
import Employee from './domain/entities/employee.entity';
import {
  CompanyRepositoryToken,
  CreateCompanyUseCaseToken,
  EmployeeRepositoryToken,
  CreateEmployeeUseCaseToken,
  GetAllCompaniesUseCaseToken,
  GetCompanyByIdUseCaseToken,
  GetAllEmployeesUseCaseToken,
  GetEmployeeByIdUseCaseToken,
  GetEmployeesByCompanyIdUseCaseToken,
} from './app.tokens';
import CreateCompanyUseCase from './usecases/company/create.company.usecase';
import CreateEmployeeUseCase from './usecases/employee/create.employee.usecase';
import CompanyRepository from './external/repository/company.repository';
import EmployeeRepository from './external/repository/employee.repository';
import GetAllCompaniesUseCase from './usecases/company/get-all.companies.usecase';
import GetCompanyByIdUseCase from './usecases/company/get-by-id.company.usecase';
import GetAllEmployeesUseCase from './usecases/employee/get-all.employees.usecase';
import GetEmployeeByIdUseCase from './usecases/employee/get-by-id.employee.usecase';
import GetEmployeesByCompanyIdUseCase from './usecases/employee/get-by-company-id.employee.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [Company, Employee],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Company, Employee]),
  ],
  controllers: [CompanyController, EmployeeController],
  providers: [
    // Use Cases
    {
      provide: CreateCompanyUseCaseToken,
      useClass: CreateCompanyUseCase,
    },
    {
      provide: CreateEmployeeUseCaseToken,
      useClass: CreateEmployeeUseCase,
    },
    {
      provide: GetAllCompaniesUseCaseToken,
      useClass: GetAllCompaniesUseCase,
    },
    {
      provide: GetCompanyByIdUseCaseToken,
      useClass: GetCompanyByIdUseCase,
    },
    {
      provide: GetAllEmployeesUseCaseToken,
      useClass: GetAllEmployeesUseCase,
    },
    {
      provide: GetEmployeeByIdUseCaseToken,
      useClass: GetEmployeeByIdUseCase,
    },
    {
      provide: GetEmployeesByCompanyIdUseCaseToken,
      useClass: GetEmployeesByCompanyIdUseCase,
    },

    // Repositories
    {
      provide: CompanyRepositoryToken,
      useClass: CompanyRepository,
    },
    {
      provide: EmployeeRepositoryToken,
      useClass: EmployeeRepository,
    },
  ],
})
export class AppModule {}