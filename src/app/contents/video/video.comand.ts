import { ContentsType } from '@app/contents/contents.command';
import { VideoProperties } from '@domain/video/video';

export type VideoListQuery = {
  page: number;
  limit: number;
};

export type VideoProfileResponseProperties = Pick<
  VideoProperties,
  | 'id'
  | 'videoId'
  | 'title'
  | 'videoUrl'
  | 'description'
  | 'thumbnailUri'
  | 'channelId'
  | 'channelTitle'
  | 'communityTitle'
  | 'uploadedAt'
> & { contentsType: ContentsType };
