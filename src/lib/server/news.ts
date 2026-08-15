import { readJsonData } from '$lib/server/data';

export async function fetchNews() {
  try {
    return readJsonData<any[]>('news.json');
  } catch (error) {
    console.error('お知らせの読み込みに失敗しました。:', error);
    return [];
  }
}
