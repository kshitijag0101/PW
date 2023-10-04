# Simplified Summary Statistics Backend

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
-   [Usage](#usage)
-   [API Documentation](#api-documentation)
-   [Database](#database)
-   [Testing](#testing)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

### Prerequisites

-   Install [Node.js](https://nodejs.org/en/) version LTS

### Installation

-   Install dependencies

```
cd <project_name>
yarn
```

-   Build the project

```
yarn build
```

-   Run the project

```
yarn dev
```

### Configuration

This project uses the following environment variables:

| Name         | Description           | Default Value                                                                                  |
| ------------ | --------------------- | ---------------------------------------------------------------------------------------------- |
| PORT         | Port for Express App  | "3000"                                                                                         |
| MONGODB_URI  | URI of MongoDB Server | "mongodb+srv://kshitij:<password>@cluster0.8fwzadc.mongodb.net/pw?retryWrites=true&w=majority" |
| SECRET_TOKEN | Token Secret for JWT  | "somesecret"                                                                                   |

Test on `http://localhost:3000` at POSTMAN

## Usage

### Endpoint 1

-   **Route:** `/emp/login`
-   **Method:** POST
-   **Description:** Login to backend
-   **Request Body:**
    -   JSON object with fields:
        -   `username`: string
        -   `password`: string
-   **Request Body Example:**
    ```
    {
        "username": "user"
        "password": "pass"
    }
    ```
-   **Response:**
    -   Status: 200 Created
    -   JWT Token

### Endpoint 2

-   **Route:** `/emp/add-data`
-   **Method:** POST
-   **Description:** Add JSON data to DB
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 201 Created

### Endpoint 3

-   **Route:** `/emp/add-employee`
-   **Method:** POST
-   **Description:** Add Employee details to DB
-   **Request Body:**
    -   JSON object with fields:
        -   `name`: string
        -   `salary`: number
        -   `currency`: string
        -   `department`: string
        -   `sub_department`: string
        -   `on_contract`: bool
-   **Request Body Example:**
    ```
    {
        "name": "Kshitij",
        "salary": "30000",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Backend",
        "on_contract" : "false"
    }
    ```
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 201 Created

### Endpoint 4

-   **Route:** `/emp/delete-employee`
-   **Method:** DELETE
-   **Description:** Delete Employee details from DB
-   **Request Body:**
    -   JSON object with fields:
        -   `name`: string
        -   `salary`: number
        -   `currency`: string
        -   `department`: string
        -   `sub_department`: string
        -   `on_contract`: bool
-   **Request Body Example:**
    ```
    {
        "name": "Kshitij",
        "salary": "30000",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Backend",
        "on_contract" : "false"
    }
    ```
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 200 OK

### Endpoint 5

-   **Route:** `/api/statistics`
-   **Method:** GET
-   **Description:** Get Summary Statistics of Salary from DB
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 200 OK
    -   data

### Endpoint 6

-   **Route:** `/api/statistics-contract`
-   **Method:** GET
-   **Description:** Get Summary Statistics of Salary from DB who are on Contract
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 200 OK
    -   data

### Endpoint 7

-   **Route:** `/api/statistics-department`
-   **Method:** GET
-   **Description:** Get Summary Statistics of Salary from DB by Department
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 200 OK
    -   data

### Endpoint 8

-   **Route:** `/api/statistics-department-subdepartment`
-   **Method:** GET
-   **Description:** Get Summary Statistics of Salary from DB by Department and Sub Department
-   **Authentication:** Bearer Token
    -   In the request headers, include an `Authorization` header with the Bearer Token:
        ```
        Authorization: Bearer YOUR_TOKEN
        ```
-   **Response:**
    -   Status: 200 OK
    -   data
