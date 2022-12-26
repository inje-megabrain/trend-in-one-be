import { CommunityTitle, PostProperties } from '@domain/post/post';

export class DcPost {
  title!: string;
  author!: string;
  date!: Date;
  views!: number;
  likes!: number;
  hasImage!: boolean;
  postUrl!: string;
  uploadedAt!: Date;
  communityTitle!: CommunityTitle;

  constructor(postIngredients: PostProperties) {
    this.title = postIngredients.title;
    this.author = postIngredients.author;
    this.uploadedAt = postIngredients.uploadedAt;
    this.views = postIngredients.views;
    this.likes = postIngredients.likes;
    this.hasImage = postIngredients.hasImage;
    this.postUrl = postIngredients.postUrl;
    this.communityTitle = CommunityTitle.DC_INSIDE;
  }
}
