import fm from 'front-matter';
import type { Post, FrontMatter } from '$lib/types';

let getAllPostsCache: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  // クライアントサイドでは空配列
  if (typeof window !== 'undefined') {
    return [];
  }
  
  if (getAllPostsCache) {
    return getAllPostsCache;
  }
  
  const postsModules = import.meta.glob('/static/news/*.md', { 
    eager: true, 
    as: 'raw' 
  });
  
  const posts = Object.entries(postsModules)
    .map(([path, rawContent]) => {
      const { attributes, body } = fm<FrontMatter>(rawContent as string);
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // attributesがundefinedでないことを確認
      if (!attributes) {
        console.error(`Frontmatter not found in ${path}`);
        return null;
      }
      
      return {
        slug,
        title: attributes.title,
        author: attributes.author,
        category: attributes.category,
        date: attributes.date,
        thumbnail: attributes.thumbnail,
        edited: attributes.edited,
        content: body,
      } as Post;
    })
    .filter((post): post is Post => post !== null)  // nullを除去
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  getAllPostsCache = posts;
  return posts;
}

// 個別記事を取得する関数
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}