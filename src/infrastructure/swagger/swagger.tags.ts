export const tags: SwaggerTag[] = [
  // 콘텐츠 관련 태그
  { name: '[콘텐츠] 종합', description: '콘텐츠 관련 기능' },
  { name: '[콘텐츠] 게시글', description: '게시글 관련 기능' },
  { name: '[콘텐츠] 영상', description: '영상 관련 기능' },
  { name: '[콘텐츠] 핫한 주제', description: '트위터 토픽 관련 기능' },

  // 크롤러 관련 태그
  { name: '[크롤러] REDDIT', description: 'REDDIT 크롤러 관련 기능' },
  { name: '[크롤러] DC_INSIDE', description: 'DC_INSIDE 크롤러 관련 기능' },
  { name: '[크롤러] TWITTER', description: 'TWITTER 크롤러 관련 기능' },
  { name: '[크롤러] YOUTUBE', description: 'YOUTUBE 크롤러 관련 기능' },

  // 로그인 관련 태그
  { name: '[인증] 카카오 로그인', description: '카카오 로그인 관련 기능' },

  // 회원 관련 태그
  { name: '[계정] 회원', description: '계정 관련 기능' },
  { name: '[계정] 북마크', description: '계정 관련 기능' },
];
type SwaggerTag = { name: string; description: string };
