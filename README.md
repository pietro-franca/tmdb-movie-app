# TMDB SEARCH APP

Aplicação web para explorar, buscar e avaliar filmes utilizando a API do TMDB. Possui autenticação de usuários com JWT, filtros, scroll infinito e cache de dados para melhor performance.

---

![Página Inicial](./assets/Captura%20de%20tela%202026-01-16%20162859.png)

## 🚀 Tecnologias Utilizadas

### **Frontend**
* **React + Vite**: Ambiente de desenvolvimento ultra-rápido.
* **TypeScript**: Segurança e inteligência no código com tipagem estática.
* **Tailwind CSS**: Estilização moderna com foco em performance e design responsivo.
* **Lucide React**: Biblioteca de ícones elegantes.
* **Context API**: Gerenciamento de estado global para autenticação.

### **Backend**
* **Python + Flask**: Micro-framework para uma API ágil e leve.
* **SQLAlchemy**: ORM para manipulação de banco de dados SQL.
* **JWT (JSON Web Tokens)**: Segurança no tráfego de dados e controle de acesso.
* **Docker**: Conteinerização para garantir que o app rode em qualquer lugar.

---

## Funcionalidades

- Buscar filmes por nome
- Filtrar por gênero e data de lançamento
- Scroll infinito para explorar mais filmes
- Avaliar filmes (nota de 0 a 5)
- Visualizar detalhes do filme e elenco
- Login e cadastro com JWT e Cookies HttpOnly
- Cache de resultados para melhorar performance

---

## Pré-requisitos

Antes de rodar a aplicação, você precisa ter instalados em sua máquina os seguintes softwares:

### Backend (Flask)

- [Python](https://www.python.org/) >= 3.10
- [pip](https://pip.pypa.io/en/stable/) (gerenciador de pacotes do Python)

### Frontend (React + Typescript + Vite)

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Docker (opcional)

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### API Keys

- **TMDB API Key:**  
  Crie uma conta em [The Movie Database (TMDB)](https://www.themoviedb.org/) e gere sua chave de API.
- **JWT Secret Key:**  
  Uma string aleatória segura usada para gerar tokens JWT.

---

## Configuração do Projeto

1. Clone o repositório:

```
git clone https://github.com/seu-usuario/tmdb-movie-app.git
cd tmdb-movie-app
```

2. Crie os arquivos .env com as variáveis de ambiente:

- Backend (backend/.env):

```
TMDB_API_KEY=YOUR_TMDB_API_KEY
SECRET_KEY=YOUR_JWT_SECRET_KEY
```

- Frontend (frontend/.env):

```
VITE_TMDB_TOKEN=YOUR_TMDB_API_KEY
```

## Rodando localmente

### Backend

1. Instale as dependências:

```
cd backend
pip install -r requirements.txt
```

2. Rode a API:

```
py app.py
```

O backend estará disponível em `http://localhost:5000`

### Frontend

1. Instale as dependências:

```
cd frontend
npm install
```

2. Rode a API:

```
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Rodando com Docker

1. Certifique-se de que o docker está rodando na sua máquina (abra o Docker Desktop)

2. Suba os containers:

```
docker compose up --build
```

3. Acesse a aplicação:

```
Frontend -> http://localhost:5173
Backend -> http://localhost:5000
```

4. Para derrubar os containers:

```
docker compose down
```

Para uma próxima vez que for rodar a aplicação, basta rodar:

```
docker compose up
```

## Prints


![Login](./assets/Captura%20de%20tela%202026-01-16%20162527.png)

![Filmes Avaliados](./assets/Captura%20de%20tela%202026-01-16%20162959.png)

![Mobile Busca](./assets/Captura%20de%20tela%202026-01-16%20163103.png)

![Mobile Filme](./assets/Captura%20de%20tela%202026-01-16%20163125.png)