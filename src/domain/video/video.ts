import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

export type VideoProperties = {
  id: string;
  videoId: string;
  videoUrl?: string;
  title: string;
  description: string;
  thumbnailUri: string;
  channel: VideoChannel | null;
  channelId?: string;
  channelTitle?: string;
  community: Community;
  communityId?: string;
  communityTitle?: CommunityTitle;
  etag: string; // 콘텐츠 업데이트 여부
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type VideoChannelProperties = {
  id: string;
  channelId: string;
  title: string;
  video: Video[];
  community: Community;
  communityId?: string;
  communityTitle?: CommunityTitle;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
