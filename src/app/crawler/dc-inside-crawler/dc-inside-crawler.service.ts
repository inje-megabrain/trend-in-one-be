import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@domain/post/post.entity';

@Injectable()
export class DcInsideCrawlerService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async crawlDcInside(): Promise<boolean> {
    //TODO: DC Inside 크롤링을 실행하는 로직

    // DC Inside 접속
    // 실시간 베스트 접속
    // 게시글 목록을 가져옴(글 제목, 이미지 여부, 작성자 닉네임, 작성 시간, 게시글 URL, 좋아요 수(추천))
    // 게시글 페이지 수 만큼 가져오기 (pageNum)

    return true;
  }
}
