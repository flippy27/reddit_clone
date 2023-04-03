import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { Theme } from './entities/theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Theme])],
  controllers: [ThemeController],
  providers: [ThemeService]
})
export class ThemeModule {}
