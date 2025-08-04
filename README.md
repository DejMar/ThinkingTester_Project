# User Management E2E Testing

## Overview
This project is an end-to-end (E2E) testing suite for a user management application. It utilizes Playwright for browser automation to test various functionalities related to user creation, updating, and deletion.

## Features
- **User Registration**: Tests the registration of new users.
- **User Verification**: Confirms that users are correctly displayed in the application.
- **User Update**: Tests the ability to update user information.
- **User Deletion**: Verifies that users can be deleted from the system.
- **Bulk User Management**: Tests the addition of multiple users at once.
- **Data Comparison**: Compares JSON files to ensure data integrity.

## Structure
- **Tests**: Located in the `tests/E2E` directory, the test cases are organized by functionality.
- **Page Objects**: Encapsulate the interactions with the application UI, promoting reusability and maintainability.
- **Helpers**: Provide shared functions and utilities for logging and data handling.

## Getting Started
1. **Install Dependencies**: Run `npm install` to install the required packages.
2. **Run Tests**: Execute `npm test` to run the E2E tests.

