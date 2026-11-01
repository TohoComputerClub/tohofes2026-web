/*
import { fetchNews } from '#lib/server/getjson/news';

export async function load() {
	const news = await fetchNews();
	return { news };
}
*/

import { getAllPosts } from '#lib/news.js';
import type { Post } from '#lib/types.js';

export async function load() {
  const posts = await getAllPosts();
  return { posts };
}
