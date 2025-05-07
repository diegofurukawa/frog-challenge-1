// create.employee.input.dto.ts com validações melhoradas
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsPositive,
  Matches,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import CreateEmployeeUseCaseInput from 'src/usecases/employee/input/create.employee.usecase.input';

export default class CreateEmployeeInputDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Matches(/^(\+55|)[0-9]{10,11}$/, { 
    message: 'O telefone deve estar em um formato válido (ex: 11987654321 ou +5511987654321)' 
  })
  phone: string;

  @IsDate({ message: 'A data de nascimento deve ser uma data válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthdate: Date;

  @IsString({ message: 'A cidade deve ser uma string' })
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @IsString({ message: 'O estado deve ser uma string' })
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @Length(2, 2, { message: 'O estado deve conter exatamente 2 caracteres (sigla do estado)' })
  state: string;

  @IsNumber({}, { message: 'O ID da empresa deve ser um número' })
  @IsPositive({ message: 'O ID da empresa deve ser um número positivo' })
  @IsNotEmpty({ message: 'O ID da empresa é obrigatório' })
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