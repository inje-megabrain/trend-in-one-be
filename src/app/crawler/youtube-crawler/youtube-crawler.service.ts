import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { videoIngredients } from '@app/crawler/youtube-crawler/youtube.command';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

@Injectable()
export class YoutubeCrawlerService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(VideoChannel)
    private readonly videoChannelRepository: Repository<VideoChannel>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async getVideos(): Promise<boolean> {
    //TODO: 유튜브 API 가져오기 구현
    const result: any = {
      kind: 'youtube#searchListResponse',
      etag: 'k59WpEro8Dxf8D8Fd5qYZf8Da3U',
      nextPageToken: 'CAUQAA',
      regionCode: 'KR',
      pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 5,
      },
      items: [
        {
          kind: 'youtube#searchResult',
          etag: 'vkvbREc2l4mKOpKqD2TnLWk4Q_M',
          id: {
            kind: 'youtube#video',
            videoId: 'mgbZunbhsX0',
          },
          snippet: {
            publishedAt: '2018-08-15T15:45:01Z',
            channelId: 'UCBVjMGOIkavEAhyqpxJ73Dw',
            title: 'Charlie Puth - Perfect Pitch',
            description:
              'Charlie Puth explains how sound and music are an essential part of how he experiences the world. Available with YouTube ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/mgbZunbhsX0/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/mgbZunbhsX0/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/mgbZunbhsX0/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Maroon 5',
            liveBroadcastContent: 'none',
            publishTime: '2018-08-15T15:45:01Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'uIo_JLUB-Kg9dcqnOPgik5SFgYk',
          id: {
            kind: 'youtube#video',
            videoId: 'Iiukq_ilT0Y',
          },
          snippet: {
            publishedAt: '2018-04-11T15:00:01Z',
            channelId: 'UCLkAepWjdylmXSltofFvsYQ',
            title: 'Ep4 It‘s on you and I | BTS: Burn the Stage',
            description:
              'Can the show go on? BTS begin to wrap up their South America tour. Day-by-day, we see how the members passionately discuss ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/Iiukq_ilT0Y/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/Iiukq_ilT0Y/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/Iiukq_ilT0Y/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'BANGTANTV',
            liveBroadcastContent: 'none',
            publishTime: '2018-04-11T15:00:01Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'ZvkuL7DD8ovXoTY13ei3WAQn2CI',
          id: {
            kind: 'youtube#video',
            videoId: 'RmZ3DPJQo2k',
          },
          snippet: {
            publishedAt: '2018-04-04T15:00:05Z',
            channelId: 'UCLkAepWjdylmXSltofFvsYQ',
            title: 'Ep3 Just give me a smile | BTS: Burn the Stage',
            description:
              'In their most private moment, BTS open up and reveal the truth about themselves. BTS continue their whirlwind South America ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/RmZ3DPJQo2k/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/RmZ3DPJQo2k/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/RmZ3DPJQo2k/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'BANGTANTV',
            liveBroadcastContent: 'none',
            publishTime: '2018-04-04T15:00:05Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'PumgnYv94KC48veIjjFoILT8mMA',
          id: {
            kind: 'youtube#video',
            videoId: 'YgG9f4MJ1eU',
          },
          snippet: {
            publishedAt: '2019-01-18T14:00:47Z',
            channelId: 'UCLkAepWjdylmXSltofFvsYQ',
            title: 'Burn the Stage: the Movie',
            description:
              'Burn the Stage: the Movie is the first movie from BTS, going behind-the-scenes of the BTS WINGS TOUR to reveal the full story of ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/YgG9f4MJ1eU/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/YgG9f4MJ1eU/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/YgG9f4MJ1eU/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'BANGTANTV',
            liveBroadcastContent: 'none',
            publishTime: '2019-01-18T14:00:47Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'cIcXrY_AkM04XH77c2FWMHjUZf0',
          id: {
            kind: 'youtube#video',
            videoId: 'L38H9yVb3d8',
          },
          snippet: {
            publishedAt: '2018-03-28T15:00:50Z',
            channelId: 'UCLkAepWjdylmXSltofFvsYQ',
            title: 'Ep2 You already have the answer | BTS: Burn the Stage',
            description:
              'A moment of triumph takes a scary turn: Jungkook, the youngest member, falls terribly ill. The Wings tour officially kicks off with a ...',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/L38H9yVb3d8/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/L38H9yVb3d8/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/L38H9yVb3d8/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'BANGTANTV',
            liveBroadcastContent: 'none',
            publishTime: '2018-03-28T15:00:50Z',
          },
        },
      ],
    }; // API 반환 데이터
    const { items: data } = result;

    const community = await this.communityRepository.findOne({
      where: { title: CommunityTitle.YOUTUBE },
    });

    data.map(async (videoData: videoIngredients) => {
      let channel = await this.videoChannelRepository.findOne({
        where: { channelId: videoData.snippet.channelId },
      });

      if (!channel) {
        channel = await this.videoChannelRepository.save({
          channelId: videoData.snippet.channelId,
          title: videoData.snippet.channelTitle,
        });
      }

      await this.videoRepository.save({
        videoId: videoData.id.videoId,
        etag: videoData.etag,
        uploadedAt: videoData.snippet.publishedAt,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        thumbnailUri: videoData.snippet.thumbnails.high.url,
        community,
        channel,
      });
    });

    return true;
  }
}
