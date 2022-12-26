import { PostProperties } from '@domain/post/post';

export enum BestBoards {
  BEST = 1,
  LITE = 3,
  NIGHT = 5,
}

export type BestBoardIds = BestBoards[];

export type PostIngredients = Omit<
  PostProperties,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'community'
>;
