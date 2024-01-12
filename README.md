# Freezer ID

[Freezer ID](https://freezer.lukeh.xyz/) website and development [documentation](/freezer-id/README.md).

## Overview

This project aims to create a platform for managing freezer items with the following functionalities:

### Accounts
- **Login Options:** Users can log in via Google or other supported providers. Or they can use traditional username/password login system.

### Freezer Item Management
- **List of Freezer Items:** Users can maintain a list of freezer items, each including:
  - **Identifier**
  - **Name**
  - **Description**
  - **Time Added**
  - **Tags**

### Sorting and Grouping
- **Sorting:** Users have the ability to sort freezer items based on any of the available fields (identifier, name, description, time added, etc.).
- **Grouping:** Users can group freezer items based on assigned tags for easier categorization and management.

## Additional Features

### Extra Enhancements
- **Freezer Item Photo:** To enhance identification, users can upload photos of freezer items for better visual recognition.

## Technologies

* **NextJS** - Powers both the frontend and backend for efficient development.
* **PostgreSQL** - Handles the database operations, ensuring robust data management.
* **Docker** - Facilitates containerization, streamlining deployment and scalability processes.

## Database Design

#### Users Table

| Column Name   | Data Type    | Constraints      |
| ------------- | ------------ | ---------------- |
| id            | SERIAL       | PRIMARY KEY      |
| username      | VARCHAR(255) | UNIQUE, NOT NULL |
| email         | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL         |

#### Items Table

| Column Name | Data Type    | Constraints            |
| ----------- | ------------ | ---------------------- |
| id          | SERIAL       | PRIMARY KEY            |
| user_id     | INTEGER      | FOREIGN KEY (Users.id) |
| item_id     | VARCHAR(255) | NOT NULL               |
| name        | VARCHAR(255) | NOT NULL               |
| added       | TIMESTAMP    |                        |
| removed     | TIMESTAMP    |                        |
| modified    | TIMESTAMP    |                        |

#### Tags Table

| Column Name | Data Type    | Constraints |
| ----------- | ------------ | ----------- |
| id          | SERIAL       | PRIMARY KEY |
| name        | VARCHAR(255) | NOT NULL    |

