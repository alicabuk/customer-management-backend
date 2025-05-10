CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username character varying(50)NOT NULL,
    password text NOT NULL
);
CREATE TABLE IF NOT EXISTS public.customers
(
    id serial NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    national_id character varying(11) NOT NULL,
    registration_date timestamp without time zone NOT NULL
);