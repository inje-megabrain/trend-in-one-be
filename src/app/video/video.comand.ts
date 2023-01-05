import { VideoProperties } from '@domain/video/video';

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
>;
