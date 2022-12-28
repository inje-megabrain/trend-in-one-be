import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { Post } from '@domain/post/post.entity';

@Injectable()
export class RedditCrawlerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  //TODO: 리팩토링 필요
  async crawlReddit(): Promise<boolean> {
    //API 엑세스 토큰 가져오기
    const account = {
      grant_type: 'password',
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    };

    const auth = {
      username: process.env.REDDIT_USE_SCRIPT,
      password: process.env.REDDIT_SECRET,
    };

    const { data, status } = await this.httpService.axiosRef.request({
      method: 'POST',
      url: `https://www.reddit.com/api/v1/access_token`,
      params: account,
      auth: auth,
    });

    const accessToken = data.access_token;
    //API 엑세스 토큰으로 크롤링 시작
    const { data: posts, status: status2 } =
      await this.httpService.axiosRef.request({
        method: 'GET',
        url: `https://oauth.reddit.com/best`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    const communityId = await this.communityRepository.findOne({
      where: { title: CommunityTitle.REDDIT },
    });

    //크롤링한 데이터를 DB에 저장
    await posts.data.children.map(async (originalPost) => {
      const post = {
        title: originalPost.data.title,
        author: originalPost.data.author,
        views: null,
        likes: originalPost.data.ups,
        hasImage: originalPost.data.thumbnail !== 'self',
        postUrl: 'https://www.reddit.com' + originalPost.data.permalink,
        uploadedAt: new Date(originalPost.data.created_utc * 1000),
        community: communityId,
      } as Post;
      await this.postRepository.save({
        ...post,
      });
    });

    return true;
  }
}
