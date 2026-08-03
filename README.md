# TMDB SEARCH APP

A web application for exploring, searching for, and rating movies using the TMDB API. It features user authentication with JWT, filters, infinite scrolling, and data caching for better performance.

![Home Page](./assets/Captura%20de%20tela%202026-01-16%20162859.png)

## Technologies Used

### **Frontend**
* **React + Vite**: Ultra-fast development environment.
* **TypeScript**: Code safety and intelligence with static typing.
* **Tailwind CSS**: Modern styling with a focus on performance and responsive design.
* **Lucide React**: A library of elegant icons.
* **Context API**: Global state management for authentication.

### **Backend**
* **Python + Flask**: A micro-framework for an agile and lightweight API.
* **SQLAlchemy**: An ORM for SQL database manipulation.
* **JWT (JSON Web Tokens)**: Data traffic security and access control.
* **Docker**: Containerization to ensure the app runs anywhere.

---

## Features

- Search for movies by name
- Filter by genre and release date
- Infinite scroll to explore more movies
- Rate movies (rating from 0 to 5)
- View movie and cast details
- Login and registration using JWT and HttpOnly cookies
- Cache results to improve performance

---

## Prerequisites

Before running the application, you must have the following software installed on your machine:

### Backend (Flask)

- [Python](https://www.python.org/) >= 3.10
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)

### Frontend (React + Typescript + Vite)

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Docker (optional)

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### API Keys

- **TMDB API Key:**  
  Create an account on [The Movie Database (TMDB)](https://www.themoviedb.org/) and generate your API key.
- **JWT Secret Key:**  
  A secure random string used to generate JWT tokens.

---

## Project Setup

1. Clone the repository:

```
git clone https://github.com/your-user/tmdb-movie-app.git
cd tmdb-movie-app
```

2. Create the .env files with the environment variables:

- Backend (backend/.env):

```
TMDB_API_KEY=YOUR_TMDB_API_KEY
SECRET_KEY=YOUR_JWT_SECRET_KEY
```

- Frontend (frontend/.env):

```
VITE_TMDB_TOKEN=YOUR_TMDB_API_KEY
```

## Running Locally

### Backend

1. Install the dependencies:

```
cd backend
pip install -r requirements.txt
```

2. Run the API:

```
py app.py
```

The backend will be available at `http://localhost:5000`

### Frontend

1. Install the dependencies:

```
cd frontend
npm install
```

2. Run the app:

```
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Running with Docker

1. Make sure Docker is running on your machine (open Docker Desktop)

2. Start the containers:

```
docker compose up --build
```

3. Access the application:

```
Frontend -> http://localhost:5173
Backend -> http://localhost:5000
```

4. To stop the containers:

```
docker compose down
```

The next time you want to run the application, simply run:

```
docker compose up
```

## Some Screenshots


![Login](./assets/Captura%20de%20tela%202026-01-16%20162527.png)

![Rated Movies](./assets/Captura%20de%20tela%202026-01-16%20162959.png)

![Mobile Search](./assets/Captura%20de%20tela%202026-01-16%20163103.png)

![Mobile Movie](./assets/Captura%20de%20tela%202026-01-16%20163125.png)
