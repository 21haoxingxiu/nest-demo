import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  Inject,
  Optional,
  UseFilters,
  HttpException,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { ModuleRef } from '@nestjs/core';
import { AaaFilter } from './aaa.filter';

@Controller('aaa')
export class AaaController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  @Optional()
  @Inject('Guang')
  private readonly guang: Record<string, any>;

  constructor(
    private readonly aaaService: AaaService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    console.log('AaaController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('AaaController onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('AaaController onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('AaaController	beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    const aaaService = this.moduleRef.get<AaaService>(AaaService);

    console.log('----------', aaaService.findAll());

    console.log('AaaController onApplicationShutDown');
  }

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  @UseFilters(AaaFilter)
  findAll() {
    console.log(this.guang);
    // throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    return this.aaaService.findAll();
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log('请求的IP', ip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
