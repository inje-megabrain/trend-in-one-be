export const tags: SwaggerTag[] = [
  // 게시글 관련 태그
  { name: '[게시글] 게시글', description: '게시글 관련 기능' },

  // 토픽 관련 태그
  { name: '[토픽] 핫한 주제', description: '트위터 토픽 관련 기능' },

  // 크롤러 관련 태그
  { name: '[크롤러] REDDIT', description: 'REDDIT 크롤러 관련 기능' },
  { name: '[크롤러] DC_INSIDE', description: 'DC_INSIDE 크롤러 관련 기능' },
  { name: '[크롤러] TWITTER', description: 'TWITTER 크롤러 관련 기능' },
];
type SwaggerTag = { name: string; description: string };
