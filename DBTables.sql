-- CREATE TABLE users (
--     id VARCHAR(255) NOT NULL,
--     username VARCHAR(20) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id),
--     UNIQUE KEY email (email)
-- );

  -- CREATE TABLE posts (
  --     id int NOT NULL AUTO_INCREMENT,
  --     title VARCHAR(255) NOT NULL,
  --     body VARCHAR(255),
  --     authorId VARCHAR(255) NOT NULL,
  --     PRIMARY KEY (id),
  --     INDEX (authorId),

  --     FOREIGN KEY (authorId)
  --       REFERENCES users(id)
  --         ON DELETE CASCADE
  -- )

    -- CREATE TABLE comments (
    --   id int NOT NULL AUTO_INCREMENT,
    --   body VARCHAR(255),
    --   authorId VARCHAR(30) NOT NULL,
    --   postId int NOT NULL,
    --   PRIMARY KEY (id),

    --   FOREIGN KEY (postId)
    --     REFERENCES posts(id)
    --     ON DELETE CASCADE,

    --   FOREIGN KEY (authorId)
    --     REFERENCES users(id)
    --     ON DELETE CASCADE
    -- )

-- CREATE TABLE userfavs (
--   id int NOT NULL AUTO_INCREMENT,
--   postId int NOT NULL,
--   userId VARCHAR(255) NOT NULL,

--   PRIMARY KEY (id),
--   INDEX (userId),

--   FOREIGN KEY (postId)
--     REFERENCES posts(id)
--     ON DELETE CASCADE,

--   FOREIGN KEY (userId)
--     REFERENCES users(id)
--     ON DELETE CASCADE
-- );

  -- CREATE TABLE tags (
  --   id int NOT NULL AUTO_INCREMENT,
  --   name VARCHAR(45) NOT NULL,
  --   postId int NOT NULL,

  --   PRIMARY KEY (id),
  --   INDEX (postId),

  --   FOREIGN KEY (postId)
  --     REFERENCES posts(id)
  -- )

