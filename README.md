
# Trend in One API 서버

## 0. Information
### 0-1. API Documents
- Development API: [localhost:13000/docs](http://203.241.228.50:13000/docs)
  <img width="1912" alt="스크린샷 2023-03-31 오후 11 43 29" src="https://user-images.githubusercontent.com/75980875/229152736-931a21bb-6290-46d9-80af-ee8e0e30b202.png">
  수집된 데이터 목록
<img width="1912" alt="스크린샷 2023-03-31 오후 11 45 06" src="https://user-images.githubusercontent.com/75980875/229152949-e1059a59-0d4f-4ea6-894f-2132f0dcdacc.png">

- ADMIN SERVER: http://203.241.228.50:13000/admin 
  ![image](https://user-images.githubusercontent.com/75980875/229150392-50c1a7eb-b120-4213-b5b1-94d3ee29acd5.png)
  ![image](https://user-images.githubusercontent.com/75980875/229150474-7dd26126-a175-4124-bb5e-9021b5d2d379.png)


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
