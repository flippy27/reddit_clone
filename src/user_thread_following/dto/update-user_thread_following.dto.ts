import { PartialType } from '@nestjs/swagger';
import { CreateUserThreadFollowingDto } from './create-user_thread_following.dto';

export class UpdateUserThreadFollowingDto extends PartialType(CreateUserThreadFollowingDto) {}
