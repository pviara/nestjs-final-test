# NestJS final project
This project is a NestJS-based API for managing users and tasks. It includes functionality for creating users, creating tasks, and retrieving tasks for a specific user. The API also includes validation to ensure the correctness of the data.

## Developers
This project developed by :
- Sara BEVILACQUA
- Sabrina TAMDA

## Prerequisites
What things you need to install the software and how to install them.

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## 🚀 Installing

1. Clone repository

2. Install dependecies
```bash
npm ci
```

3. Start the server with docker
  **In windows**
  ```bash
  npm run start:postgres:win
  ```
  **In linux**
  ```bash
  npm run start:postgres
  ```

4. To run the tests :
 **without docker**
  ```bash
  npm run test
  ```
 **with docker on windows**
  ```bash
  npm run test:e2e:postgres:win
  ```
 **With docker on linux**
 ```bash
 npm run test:e2e:postgres
 ```

## Build

this project is built using the following technogies :

- TypeScript
- Postgres
- TypeORM


## Acknowledgments
Project forked `from nestjs-final-test` for educational purposes.


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.









