export interface FrontMatter {
  title: string;
  author: string;
  date: string;
  category: string;
  edited: number;
  tags: string | string[];
  heading: string;
  thumbnail?: string;
}

export interface Post extends Omit<FrontMatter, 'tags'> {
  tags: string[];
  slug: string;
  content: string;
}