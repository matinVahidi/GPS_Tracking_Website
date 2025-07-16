// models/User.js

export class User {
  constructor(id, email, password, name = '', deviceIds = [], role = 'user') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.deviceIds = deviceIds; // Stores device IDs
    this.role = role; // 'user' or 'admin'
  }
}

// In-memory user list with mixed roles
export const users = [
  new User(1, 'test@example.com', '$2b$10$abcdefghijklmnopqrstuv', 'Test User', [], 'user'),
  new User(2, 'jane@doe.com', '$2b$10$abcdefghijklmnopqrstuv', 'Jane Doe', [], 'user'),
  new User(100, 'admin@example.com', '$2b$10$abcdefghijklmnopqrstuv', 'Main Admin', [], 'admin')
];
