// src/domain/interfaces/repositories/employee.repository.interface.ts
import Employee from 'src/domain/entities/employee.entity';

export default interface IEmployeeRepository {
  create(data: Partial<Employee>): Promise<Employee>;
  findById(id: number): Promise<Employee | null>;
  findOne(data: Partial<Employee>): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  findByCompanyId(companyId: number): Promise<Employee[]>;
  update(id: number, data: Partial<Employee>): Promise<Employee | null>;
  delete(id: number): Promise<void>;
}