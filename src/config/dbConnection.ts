import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  novaventa: {
    dbName: process.env.DB_DB,
    port: parseInt(process.env.DB_PORT, 10),
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
  },
  mirrorEnvi: {
    dbName: process.env.E_CONTROL_REPORT_DB_DATABASE,
    port: parseInt(process.env.E_CONTROL_REPORT_DB_PORT, 10),
    password: process.env.E_CONTROL_REPORT_DB_PASSWORD,
    user: process.env.E_CONTROL_REPORT_DB_USER,
    host: process.env.E_CONTROL_REPORT_DB_HOST,
  },
  apiKey: process.env.API_KEY,
}));
