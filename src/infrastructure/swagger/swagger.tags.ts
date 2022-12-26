export const tags: SwaggerTag[] = [
  // 게시글 관련 태그
  { name: '[게시글] 게시글', description: '게시글 관련 기능' },

  // 크롤러 관련 태그
  { name: '[크롤러] Reddit', description: 'Reddit 크롤러 관련 기능' },
  { name: '[크롤러] DC Inside', description: 'DC Inside 크롤러 관련 기능' },
];
type SwaggerTag = { name: string; description: string };
