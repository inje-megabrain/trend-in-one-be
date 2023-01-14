import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { UserCreateRequest } from '@app/user/dto/user-create.request';
import { UserPasswordUpdateRequest } from '@app/user/dto/user-password-update.request';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { UserUpdateRequest } from '@app/user/dto/user-update.request';
import { UserService } from '@app/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '새로운 회원을 가입처리합니다.' })
  @ApiBody({ type: UserCreateRequest })
  @ApiCreatedResponse({ type: UserProfileResponse })
  async joinUser(
    @Body() data: UserCreateRequest,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.joinUser(data);
    return new UserProfileResponse(user);
  }

  @Get(':id')
  @ApiOperation({ summary: '회원의 아이디로 유저정보를 조회합니다.' })
  @ApiParam({ name: 'id', type: ParseUUIDPipe })
  @ApiCreatedResponse({ type: UserProfileResponse })
  async getUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.getUserProfile(id);
    return new UserProfileResponse(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: '회원의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', type: ParseUUIDPipe })
  @ApiBody({ type: UserUpdateRequest })
  @ApiCreatedResponse({ type: UserProfileResponse })
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserUpdateRequest,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.updateUserProfile(id, data);
    return new UserProfileResponse(user);
  }

  @Patch(':id/password')
  @ApiOperation({ summary: '회원의 비밀번호를 변경합니다.' })
  @ApiParam({ name: 'id', type: ParseUUIDPipe })
  @ApiBody({ type: UserPasswordUpdateRequest })
  @ApiCreatedResponse({ type: UserProfileResponse })
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserPasswordUpdateRequest,
  ): Promise<boolean> {
    return await this.userService.updateUserPassword(id, data.password);
  }

  @Delete(':id')
  @ApiOperation({ summary: '회원을 탈퇴 처리합니다.' })
  @ApiParam({ name: 'id', type: ParseUUIDPipe })
  @ApiCreatedResponse({ type: Boolean })
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return await this.userService.withdrawUser(id);
  }
}
