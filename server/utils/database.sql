DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  uuid uuid DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (username, password)
VALUES
('a', 'a'),
('b', 'b'),
('c', 'c'),
('d', 'd');

SELECt * FROM users;

DROP TABLE tasks;

CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  deadline TEXT,
  reminder BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title, deadline)
VALUES
('First Entry', '5th of October'),
('Second Entry', '6th of October'),
('Third Entry', '7th of October'),
('Fourth Entry', '8th of October');

SELECT * FROM tasks;