import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async joinUser() {
    return 'Hello World!';
  }

  @Get(':id')
  async getUserProfile() {
    return 'Hello World!';
  }

  @Patch(':id')
  async updateUserProfile() {
    return 'Hello World!';
  }

  @Patch(':id/password')
  async updateUserPassword() {
    return 'Hello World!';
  }

  @Delete(':id')
  async withdrawUser() {
    return 'Hello World!';
  }
}
