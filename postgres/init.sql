GRANT ALL PRIVILEGES ON DATABASE pzpot_db TO pzpot;

CREATE TABLE public.roles
(
    id bigint NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT uk_nb4h0p6txrmfc0xbrd1kglp9t UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to pzpot;

CREATE TABLE public.users
(
    id bigint NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    enabled boolean COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email),
    CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to pzpot;

CREATE TABLE public.user_roles
(
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT fkh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_roles
    OWNER to pzpot;

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

  insert into user_roles(user_id, role_id) VALUES
  ('1', '1'),
  ('2', '2'),
  ('3', '3'),
  ('4', '4');
