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