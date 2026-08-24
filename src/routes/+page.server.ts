import { getAllPosts } from '$lib/news';

export async function load() {
    const news = await getAllPosts();

    // 新着5件のみ取得
    const latestNews = news.slice(0, 5);

    return { latestNews};
}