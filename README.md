# Freezer ID

Website which will allow users to tag each of their freezer items (such as frozen meals) and keep them itemised in a sleek online system.

### Features

* Accounts
  * Login via Google and other providers
  * Maybe Username/Password also
* List of freezer items
  * Each item consists of;
    * identifier
    * name
    * description
    * time added
    * tags
* Allow sorting freezer items based on any of the fields
* Allow grouping freezer items based on tags

Extra nice to have features

* Freezer item photo for better identification

### Technologies

* **NextJS** - Powers both the frontend and backend for efficient development.
* **PostgreSQL** - Handles the database operations, ensuring robust data management.
* **Docker** - Facilitates containerization, streamlining deployment and scalability processes.

### Database Design

#### Users Table

| Column Name    | Data Type         | Constraints               |
|----------------|-------------------|---------------------------|
| id             | SERIAL            | PRIMARY KEY               |
| username       | VARCHAR(255)      | UNIQUE, NOT NULL          |
| email          | VARCHAR(255)      | UNIQUE, NOT NULL          |
| password_hash  | VARCHAR(255)      | NOT NULL                  |

#### Items Table

| Column Name    | Data Type         | Constraints               |
|----------------|-------------------|---------------------------|
| id             | SERIAL            | PRIMARY KEY               |
| user_id        | INTEGER           | FOREIGN KEY (Users.id)    |
| item_id        | VARCHAR(255)      | NOT NULL                  |
| name           | VARCHAR(255)      | NOT NULL                  |
| added          | TIMESTAMP         |                           |
| removed        | TIMESTAMP         |                           |
| modified       | TIMESTAMP         |                           |

#### Tags Table

| Column Name    | Data Type         | Constraints               |
|----------------|-------------------|---------------------------|
| id             | SERIAL            | PRIMARY KEY               |
| name           | VARCHAR(255)      | NOT NULL                  |

