import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from './create-thread.dto';

export class UpdateThreadDto extends PartialType(CreateThreadDto) {
  name: string;
  user_id: number;
  updated_at: Date;
  theme_id: number;
}
