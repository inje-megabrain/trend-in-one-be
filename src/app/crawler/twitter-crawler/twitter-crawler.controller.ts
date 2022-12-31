import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('twitter-crawler')
@ApiTags('[크롤러] TWITTER')
export class TwitterCrawlerController {}
