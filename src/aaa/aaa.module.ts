import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { log } from 'console';

@Module({
  controllers: [AaaController],
  providers: [
    AaaService,
    {
      provide: 'Guang',
      useFactory() {
        return {
          name: 'guang',
        };
      },
    },
  ],
})
export class AaaModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('AaaModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('appModule onApplicationBootstrap');
  }
}
