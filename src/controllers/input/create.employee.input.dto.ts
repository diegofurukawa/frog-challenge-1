import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsDate,
    IsNumber,
    IsPositive,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import CreateEmployeeUseCaseInput from 'src/usecases/employee/input/create.employee.usecase.input';
  
  export default class CreateEmployeeInputDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthdate: Date;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    state: string;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    companyId: number;
  
    toUseCaseInput(): CreateEmployeeUseCaseInput {
      return new CreateEmployeeUseCaseInput(
        this.name,
        this.email,
        this.phone,
        this.birthdate,
        this.city,
        this.state,
        this.companyId,
      );
    }
  }