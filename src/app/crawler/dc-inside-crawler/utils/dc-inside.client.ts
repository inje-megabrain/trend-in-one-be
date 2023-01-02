import * as puppeteer from 'puppeteer';
import { ElementHandle } from 'puppeteer';

import {
  BestBoardIds,
  BestBoards,
  PostIngredients,
} from '@app/crawler/dc-inside-crawler/dc-inside.command';
import { CrawlerClient } from '@app/crawler/types/crawler.client';
import { TimeoutException } from '@domain/errors/dc-inside-crawler.errors';

export class DcInsideClient implements CrawlerClient {
  async crawl(): Promise<PostIngredients[]> {
    // 크롤링 항목 선택
    const bestBoardIds: BestBoardIds = [BestBoards.BEST, BestBoards.LITE];
    const bestBoardId = bestBoardIds.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    // 크롤링할 페이지 수 선택
    const pageLimit = 1;

    // 크롤러 실행
    const crawledPosts: PostIngredients[] = [];
    for (let pageNum = 0; pageNum < pageLimit; pageNum++) {
      // DC Inside 실시간 베스트 접속
      const url = `https://gall.dcinside.com/board/lists/?id=dcbest&page=${pageNum}&_dcbest=${bestBoardId}`;
      const data: PostIngredients[] = await this.crawlAllPosts(url);
      crawledPosts.push(...data);
    }

    return crawledPosts;
  }

  async getCrawlerStatus(): Promise<boolean> {
    return true;
  }

  async crawlAllPosts(url: string): Promise<PostIngredients[]> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 5000 });
    } catch (err) {
      throw new TimeoutException();
    }
    const tableHandle: ElementHandle = await page.$('table');

    const data: PostIngredients[] = [];
    const crawledDatas: any[] = [];
    const rows = await tableHandle.$$('tr');
    for (const row of rows) {
      const cells = await row.$$('td');
      if (cells.length > 0) {
        const rowData: any[] = [];
        for (const [index, cell] of cells.entries()) {
          let cellText = await (
            await cell.getProperty('textContent')
          ).jsonValue();
          if (index === 0 && !this.isNumberString(cellText)) {
            break;
          }
          if (index === 0) {
            const rowIndex = parseInt(cellText);
            rowData.push(rowIndex);
          } else {
            cellText = cellText.replace(/[\t\n]/g, '');
            rowData.push(cellText);
          }
        }

        if (rowData.length > 0) {
          crawledDatas.push(rowData);
        }
      }
    }

    for (const crawledData of crawledDatas) {
      const postPage = await browser.newPage();
      await postPage.setViewport({ width: 1920, height: 1080 });
      await postPage.setRequestInterception(true);

      try {
        let hasImage = false;
        postPage.on('request', (req) => {
          if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font'
          ) {
            req.abort();
          } else if (
            req.resourceType() == 'image' ||
            req.resourceType() == 'media'
          ) {
            req.abort();
            hasImage = true;
          } else {
            req.continue();
          }
        });
        await postPage.goto(
          `https://gall.dcinside.com/board/view/?id=dcbest&no=${crawledData[0]}`,
        );

        const gallDate = await postPage.$("span[class='gall_date']");
        const date = await (
          await gallDate.getProperty('textContent')
        ).jsonValue();
        const gallNickname = await postPage.$("span[class='nickname in']");

        const authorNickname = await (
          await gallNickname.getProperty('textContent')
        ).jsonValue();

        const post: PostIngredients = {
          title: crawledData[1].replace(/\s\[\d+]\s+/, ''),
          author: authorNickname,
          uploadedAt: new Date(date),
          views: Number(crawledData[4]),
          likes: Number(crawledData[5]),
          hasImage,
          postUrl: `https://gall.dcinside.com/board/view/?id=dcbest&no=${crawledData[0]}`,
        };
        data.push(post);
      } finally {
        await postPage.close();
      }
    }
    await browser.close();
    return data;
  }

  isNumberString(input: string): boolean {
    return !isNaN(parseInt(input));
  }
}
