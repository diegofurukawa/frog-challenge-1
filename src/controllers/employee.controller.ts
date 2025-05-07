import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { 
  CreateEmployeeUseCaseToken,
  GetAllEmployeesUseCaseToken,
  GetEmployeeByIdUseCaseToken,
  GetEmployeesByCompanyIdUseCaseToken
} from 'src/app.tokens';
import Employee from 'src/domain/entities/employee.entity';
import IUseCase from 'src/domain/interfaces/base.usecase.interface';
import CreateEmployeeUseCaseInput from 'src/usecases/employee/input/create.employee.usecase.input';
import CreateEmployeeUseCaseOutput from 'src/usecases/employee/output/create.employee.usecase.output';
import CreateEmployeeInputDto from './input/create.employee.input.dto';
import CreateEmployeeOutputDto from './output/create.employee.output.dto';
import { GetEmployeeByIdUseCaseInput } from 'src/usecases/employee/get-by-id.employee.usecase';
import { GetEmployeesByCompanyIdUseCaseInput } from 'src/usecases/employee/get-by-company-id.employee.usecase';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(CreateEmployeeUseCaseToken)
    private readonly createEmployeeUseCase: IUseCase<
      CreateEmployeeUseCaseInput,
      CreateEmployeeUseCaseOutput
    >,
    
    @Inject(GetAllEmployeesUseCaseToken)
    private readonly getAllEmployeesUseCase: IUseCase<void, Employee[]>,
    
    @Inject(GetEmployeeByIdUseCaseToken)
    private readonly getEmployeeByIdUseCase: IUseCase<
      GetEmployeeByIdUseCaseInput,
      Employee
    >,
    
    @Inject(GetEmployeesByCompanyIdUseCaseToken)
    private readonly getEmployeesByCompanyIdUseCase: IUseCase<
      GetEmployeesByCompanyIdUseCaseInput,
      Employee[]
    >,
  ) {}

  @Post()
  async createEmployee(
    @Body() input: CreateEmployeeInputDto,
  ): Promise<CreateEmployeeOutputDto> {
    const useCaseInput = input.toUseCaseInput();
    const useCaseOutput = await this.createEmployeeUseCase.run(useCaseInput);
    return CreateEmployeeOutputDto.fromUseCaseOutput(useCaseOutput);
  }
  
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.getAllEmployeesUseCase.run();
  }
  
  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.getEmployeeByIdUseCase.run(new GetEmployeeByIdUseCaseInput(id));
  }
  
  @Get('company/:companyId')
  async getEmployeesByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<Employee[]> {
    return this.getEmployeesByCompanyIdUseCase.run(
      new GetEmployeesByCompanyIdUseCaseInput(companyId),
    );
  }
}