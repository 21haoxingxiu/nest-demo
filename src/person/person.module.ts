import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [
    {
      provide: 'app_service',
      useClass: PersonService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person2', // 异步注入动态数据
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
        return {
          name: 'bbb',
          desc: 'ccc',
        };
      },
    },
    {
      provide: 'person3',
      useExisting: 'person2',
    },
  ],
})
export class PersonModule {}
