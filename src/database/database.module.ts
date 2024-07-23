import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as mysql from "mysql2/promise";

import config from 'src/config/dbConnection';

@Module({
  imports:[ConfigModule],
  providers: [
    {
      provide: 'connectionNV',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.novaventa;
        const client = mysql.createPool({
          host,
          port,
          user,
          password,
          database: dbName,
        });
        return client;
      },
      inject: [config.KEY],
    },
    {
      provide: 'connectionMirrorEnvi',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.mirrorEnvi;
        const client = mysql.createPool({
          host,
          port,
          user,
          password,
          database: dbName,
        });
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['connectionNV', 'connectionMirrorEnvi'],
})
export class DatabaseModule {}
