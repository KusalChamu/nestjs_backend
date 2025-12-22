import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "devuser",
    password: "1234",
    database: "blog"
};

export default config;