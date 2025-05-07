# Estrutura de Arquivos Recomendada

```
src/
│
├── app.module.ts                                          // Arquivo principal do módulo da aplicação
├── app.tokens.ts                                          // Tokens para injeção de dependência
├── main.ts                                                // Ponto de entrada da aplicação
│
├── controllers/                                           // Camada de apresentação
│   ├── company.controller.ts                              // Controller para endpoints de empresas
│   ├── employee.controller.ts                             // Controller para endpoints de funcionários
│   ├── input/                                             // DTOs de entrada
│   │   ├── create.company.input.dto.ts
│   │   └── create.employee.input.dto.ts
│   └── output/                                            // DTOs de saída
│       ├── create.company.output.dto.ts
│       └── create.employee.output.dto.ts
│
├── domain/                                                // Camada de domínio
│   ├── entities/                                          // Entidades de domínio
│   │   ├── base.entity.ts                                 // Entidade base com campos comuns
│   │   ├── company.entity.ts                              // Entidade de empresa
│   │   └── employee.entity.ts                             // Entidade de funcionário
│   └── interfaces/                                        // Interfaces do domínio
│       ├── base.usecase.interface.ts                      // Interface base para casos de uso
│       └── repositories/                                  // Interfaces de repositórios
│           ├── company.repository.interface.ts
│           └── employee.repository.interface.ts
│
├── usecases/                                              // Camada de casos de uso
│   ├── company/                                           // Casos de uso relacionados a empresas
│   │   ├── create.company.usecase.ts                      // Caso de uso para criar empresa
│   │   ├── get-all.companies.usecase.ts                   // Caso de uso para listar empresas
│   │   ├── get-by-id.company.usecase.ts                   // Caso de uso para obter empresa por ID
│   │   ├── input/                                         // Modelos de entrada para casos de uso
│   │   │   └── create.company.usecase.input.ts
│   │   └── output/                                        // Modelos de saída para casos de uso
│   │       └── create.company.usecase.output.ts
│   └── employee/                                          // Casos de uso relacionados a funcionários
│       ├── create.employee.usecase.ts                     // Caso de uso para criar funcionário
│       ├── get-all.employees.usecase.ts                   // Caso de uso para listar funcionários
│       ├── get-by-id.employee.usecase.ts                  // Caso de uso para obter funcionário por ID
│       ├── get-by-company-id.employee.usecase.ts          // Caso de uso para listar funcionários por empresa
│       ├── input/                                         // Modelos de entrada para casos de uso
│       │   └── create.employee.usecase.input.ts
│       └── output/                                        // Modelos de saída para casos de uso
│           └── create.employee.usecase.output.ts
│
└── external/                                              // Camada de infraestrutura
    └── repository/                                        // Implementações de repositórios
        ├── company.repository.ts
        └── employee.repository.ts
```