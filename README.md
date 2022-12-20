# Trend in One API 서버

## 0. Information
### 0-1. API Documents
- Development API: localhost:13000/docs
### 0-2. Maintainers
- 임채성 | [@puleugo](https://github.com/puleugo)
### 0-3. Technical Specs
- Node.js 16 (with Yarn)
- Nest.js 9

---


## 1. Prerequisites

### 1-1. Setup Environment Variables
Copy example environment variables.
```shell
$ cp .env.example .env
```
Change values below accordingly.
```dotenv
# Application
APP_URL=localhost:13000
APP_PORT=13000
APP_SECRET=xxxxxxxxxx

# Database
DB_HOST=xxxxxxxxxx
DB_PORT=15432
DB_DATABASE=xxxxxxxxxx
DB_USERNAME=xxxxxxxxxx
DB_PASSWORD=xxxxxxxxxx
```

### 1-2. Install Dependencies
This project uses **yarn** as a package manager.
```shell
$ yarn
```
## 2. Run Project
### 2-1. Run Server
You can start development server with this command.
```shell
$ yarn start:dev
```

### 2-2. Migrate Database
> The migrations will **run automatically** when the server is started.
> When it doesn't work, you can migrate manually with this command.
```shell
$ yarn migration:run
```

### 2-3. Generate New Migration
```shell
$ yarn migration:generate src/migrations/{migration_name}
``` 
#### Examples of Migration names
- `create_users_table`
- `add_social_vendor_id_to_users_table`
- `drop_password_from_users_table`
