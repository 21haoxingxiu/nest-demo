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
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll() {
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
