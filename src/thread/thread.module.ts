import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Thread])],
  controllers: [ThreadController],
  providers: [ThreadService]
})
export class ThreadModule {}
