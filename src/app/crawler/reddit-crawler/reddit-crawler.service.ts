import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import {
  AccessDeniedException,
  PostsNotFoundException,
} from '@domain/errors/reddit-crawler.errors';
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

    const { data } = await this.httpService.axiosRef.request({
      method: 'POST',
      url: `https://www.reddit.com/api/v1/access_token`,
      params: account,
      auth: auth,
    });

    if (data.error == 'invalid_grant') {
      throw new AccessDeniedException();
    }

    const { access_token: accessToken } = data;

    //API 엑세스 토큰으로 크롤링 시작
    const { data: bestPosts, status: status2 } =
      await this.httpService.axiosRef.request({
        method: 'GET',
        url: `https://oauth.reddit.com/best`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    const {
      data: { children: posts },
    } = bestPosts;

    if (status2 !== 200) {
      throw new PostsNotFoundException();
    }

    const isCommunityExist = await this.communityRepository.findOne({
      where: { title: CommunityTitle.REDDIT },
    });

    if (!isCommunityExist) {
      await this.communityRepository.save({
        title: CommunityTitle.REDDIT,
      });
    }

    const communityId = await this.communityRepository.findOne({
      where: { title: CommunityTitle.REDDIT },
    });

    for (const postData of posts) {
      const post = await this.findByPostUrl(
        'https://www.reddit.com' + postData.data.permalink,
      );

      if (post) {
        await this.postRepository.save({
          ...post,
          title: postData.data.title,
          author: postData.data.author,
          views: null,
          likes: postData.data.ups,
          hasImage: postData.data.thumbnail !== 'self',
          postUrl: 'https://www.reddit.com' + postData.data.permalink,
          uploadedAt: new Date(postData.data.created_utc * 1000),
          community: communityId,
        });
      } else {
        await this.postRepository.save({
          title: postData.data.title,
          author: postData.data.author,
          views: null,
          likes: postData.data.ups,
          hasImage: postData.data.thumbnail !== 'self',
          postUrl: 'https://www.reddit.com' + postData.data.permalink,
          uploadedAt: new Date(postData.data.created_utc * 1000),
          community: communityId,
        });
      }
    }

    return true;
  }

  async findByPostUrl(
    postUrl: string,
    select?: FindOptionsSelect<Post>,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { postUrl },
      select,
    });

    return post;
  }
}
