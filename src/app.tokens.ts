// src/app.tokens.ts
// USECASES
export const CreateCompanyUseCaseToken = Symbol('CreateCompanyUseCase')
export const CreateEmployeeUseCaseToken = Symbol('CreateEmployeeUseCase')
export const GetAllCompaniesUseCaseToken = Symbol('GetAllCompaniesUseCase')
export const GetCompanyByIdUseCaseToken = Symbol('GetCompanyByIdUseCase')
export const GetAllEmployeesUseCaseToken = Symbol('GetAllEmployeesUseCase')
export const GetEmployeeByIdUseCaseToken = Symbol('GetEmployeeByIdUseCase')
export const GetEmployeesByCompanyIdUseCaseToken = Symbol('GetEmployeesByCompanyIdUseCase')

// REPOSITORIES
export const CompanyRepositoryToken = Symbol('CompanyRepository')
export const EmployeeRepositoryToken = Symbol('EmployeeRepository')