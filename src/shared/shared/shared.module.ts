import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.registerAsync({
        useFactory: () => ({
          dest: './upload',
        }),
      }),
    ],
      exports: [MulterModule]
})
export class SharedModule {
}
