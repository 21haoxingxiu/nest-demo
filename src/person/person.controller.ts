import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

@Controller('api/person')
export class PersonController {
  constructor(
    @Inject('app_service') private readonly personService: PersonService, // 注入service
    @Inject('person') private readonly person: { name: string; age: number }, // 注入json
    @Inject('person2') private readonly person2: { name: string; desc: string }, // 注入动态对象
    @Inject('person3') private readonly person3: { name: string; desc: string }, // 注入动态对象
  ) {}

  // @Inject(PersonService)
  // private readonly personService: PersonService;

  @Get()
  findAll() {
    console.log(this.person3);
    return this.personService.findAll();
  }

  // url params
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `received: id=${id}`;
  // }

  // query
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received name=${name}, age=${age}`;
  }

  // form urlencoded
  // @Post()
  // create(@Body() createPersonDto: CreatePersonDto) {
  //   return `received: ${JSON.stringify(createPersonDto)}`;
  // }

  // JSON
  // @Post()
  // create(@Body() createPersonDto: CreatePersonDto) {
  //   return `received: ${JSON.stringify(createPersonDto)}`;
  // }

  // form Data 文件上传
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('files', files);

    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
