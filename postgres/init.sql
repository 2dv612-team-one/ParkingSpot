GRANT ALL PRIVILEGES ON DATABASE pzpot_db TO pzpot;

CREATE TABLE employees (
  id          serial PRIMARY KEY,
  forename    varchar(40),
  surname     varchar(40),
  description varchar(120)
);

CREATE TABLE users (
  id          serial PRIMARY KEY,
  username    varchar(40),
  password     varchar(40),
  email varchar(120)
  -- Create a mapping for user type aswell
);

CREATE TABLE roles 
(
  id serial PRIMARY KEY,
  name varchar(20)
);

CREATE TABLE vehicles
(
        id serial PRIMARY KEY,
        user_id integer NOT NULL,
        registration_number character varying(7) COLLATE pg_catalog."default",       
        CONSTRAINT "userId_fkey" FOREIGN KEY (user_id)
            REFERENCES public.users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
);



insert into employees (forename, surname, description) values 
  ('Aaron',   'Shaw',       'Research Assistant III'),
  ('Jimmy',   'Henry',      'Marketing Manager'),
  ('Howard',  'Hansen',     'Data Coordiator'),
  ('Brenda',  'Montgomery', 'Information Systems Manager'),
  ('Jack',    'Andrews',    'Internal Auditor'),
  ('William', 'Scott',      'Administrative Officer'),
  ('Emily',   'Johnston',   'Data Coordiator'),
  ('Stephen', 'Webb',       'Senior Financial Analyst'),
  ('Donna',   'Little',     'Environmental Tech'),
  ('Tammy',   'Thompson',   'Analyst Programmer'),
  ('Denise',  'Mitchell',   'Senior Sales Associate'),
  ('Philip',  'Jordan',     'Internal Auditor'),
  ('Jean',    'Burke',      'Software Consultant'),
  ('Dennis',  'Griffin',    'Senior Cost Accountant'),
  ('Linda',   'Bishop',     'Mechanical Systems Engineer');

  insert into users (username, password, email) values 
  ('Admin',   '123',       'admin@admin.com'),
  ('User1',   '123',       'user1@admin.com'),
  ('User2',   '123',       'user2@admin.com'),
  ('User3',   '123',       'user3@admin.com');

   insert into vehicles (user_id, registration_number) values 
  ('1',   '123123'),
  ('2',   '123123'),
  ('3',   '123123'),
  ('4',   '123123');
 
  insert into roles(name) VALUES
  ('administrator'),
  ('developer'),
  ('marvin'),
  ('tester');