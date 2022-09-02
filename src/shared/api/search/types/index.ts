export type SearchByQueryRequest = {
  query: string;
};

export type SearchItemTypeType = 'Item' | 'Collection' | 'Comment';

export type HighlightTextType = { type: 'hit' | 'text'; value: string };
export type HighlightType = {
  path: string;
  score: number;
  texts: HighlightTextType[];
};

export type SearchItemType = {
  id: string;
  title: string;
  highlight: HighlightType;
  type: SearchItemTypeType;
};

export type SearchByQueryResponse = SearchItemType[];
