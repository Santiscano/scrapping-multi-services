import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrappingModule } from './scrapping/scrapping.module';
import { DatabaseModule } from './database/database.module';
import config from './config/dbConnection';

@Module({
  imports: [
    // esto se utiliza para cargar las variables de entorno en el modulo principal de la aplicación y hacerlas accesibles en toda la aplicación mediante la inyección de dependencias.
    ConfigModule.forRoot({
      load: [config], // carga la configuración de la base de datos desde el archivo dbConnection.ts y la hace accesible en toda la aplicación mediante la inyección de dependencias.
      isGlobal: true // hace que la configuración sea accesible en toda la aplicación.
    }),
    ScrappingModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
