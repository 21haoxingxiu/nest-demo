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
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { ModuleRef } from '@nestjs/core';
import { AaaFilter, AaaFilterException } from './aaa.filter';
import { Aaa, AaaCtr, Ccc, MyQuery } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AaaException } from './Aaa.Exception';
import { Roles } from './roles.decorator';
import { Role } from './role';

@AaaCtr()
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
  @Aaa('admin')
  findAll(@Ccc() c) {
    console.log(this.guang);
    // throw new HttpException('xxx', HttpStatus.BAD_REQUEST);
    return c;
    return this.aaaService.findAll();
  }

  // 自定义装饰器，参数转换
  @Get('d2')
  @UseFilters(AaaFilterException)
  @UseGuards(AaaGuard)
  @Roles(Role.Admin) // 权限控制
  getD2(
    @Query('aaa', new ParseIntPipe()) aaa,
    @MyQuery('bbb', new ParseIntPipe()) bbb,
  ) {
    throw new AaaException('aaa', 'bbb');
    console.log('aaa', aaa);
    console.log('bbb', bbb);
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
