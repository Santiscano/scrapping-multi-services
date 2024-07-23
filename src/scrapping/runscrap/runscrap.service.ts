import {
  Inject,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class RunscrapService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('connectionNV') private readonly connectionNV: Pool,
    @Inject('connectionMirrorEnvi') private readonly connectionMirrorEnvi: Pool,
  ) {}

  onModuleInit() {
    this.startScrapping();
  }

  async onModuleDestroy() {
    await this.connectionNV.end();
    await this.connectionMirrorEnvi.end();
  }

  async startScrapping() {
    while (true) {
      try {
        // 
      } catch (error) {
        console.error('Error:', error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000)); // Espera 5 minutos antes de volver a intentar.
    }
  }
}
