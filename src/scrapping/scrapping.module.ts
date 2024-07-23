import { Module } from '@nestjs/common';
import { RunscrapService } from './runscrap/runscrap.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RunscrapService],
})
export class ScrappingModule {}
