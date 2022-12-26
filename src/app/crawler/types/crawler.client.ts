import { PostIngredients } from '@app/crawler/dc-inside-crawler/dc-inside.command';

export interface CrawlerClient {
  crawl(): Promise<PostIngredients[]>;
  getCrawlerStatus(): Promise<boolean>;
}
