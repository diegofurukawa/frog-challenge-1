## 📝 To-Do 2

### 🚀 Desafio: Criar uma Rota para Listar Funcionários de uma Empresa

A tarefa é criar uma nova rota no **controller da empresa** que receba o **ID de uma empresa** e retorne todos os **funcionários** vinculados a ela. Caso a empresa não tenha funcionários cadastrados, a resposta deve ser uma lista vazia.

#### Requisitos:

1. **Validação do ID da Empresa**: O ID da empresa deve ser validado para garantir que existe uma empresa cadastrada com esse ID.

2. **Retorno da Lista de Funcionários**: A resposta deve incluir todos os funcionários vinculados à empresa informada. Caso a empresa não tenha funcionários cadastrados, deve ser retornada uma lista vazia.

#### Endpoints:

**Endpoint**: `GET /company/:companyId/employees`

- **Parâmetro**:

  - `companyId` (path parameter): O **ID** da empresa para buscar os funcionários.

**Exemplo de Requisição**:

```
GET /company/1/employees
```

**Exemplo de Resposta de Sucesso (200 OK)**:

Caso a empresa tenha funcionários:

```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@empresa.com",
    "phone": "11987654321",
    "birthdate": "2000-01-01",
    "city": "São Paulo",
    "state": "SP",
    "companyId": 1,
    "createdAt": "2025-05-02T13:23:53.000Z",
    "updatedAt": "2025-05-02T13:23:53.000Z"
  },
  {
    "id": 2,
    "name": "Maria Oliveira",
    "email": "maria.oliveira@empresa.com",
    "phone": "11987654322",
    "birthdate": "1995-03-10",
    "city": "São Paulo",
    "state": "SP",
    "companyId": 1,
    "createdAt": "2025-05-02T13:23:53.000Z",
    "updatedAt": "2025-05-02T13:23:53.000Z"
  }
]
```

Caso a empresa não tenha funcionários:

```json
[]
```

#### Possíveis erros:

- `400 Bad Request`: Invalid company ID.
- `404 Not Found`: Company not found (if no company exists with the provided ID).

---