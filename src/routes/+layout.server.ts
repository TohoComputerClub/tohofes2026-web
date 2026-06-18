import { fetchOrganizations } from "$lib/server/organizations";

//カテゴリをカンマ区切りで分割して配列として返す
function getCategories(category?: string) {
	if (!category || typeof category !== 'string') return [];
	return category
		.split(',')
		.map((value) => value.trim())
		.filter((value) => value.length > 0);
}

function hasCategory(category?: string, query?: string) {
	if (!query) return false;
	return getCategories(category).includes(query);
}

export async function load() {
  // 全データを取得
  const allData = await fetchOrganizations();

  // 除外カテゴリの定義
  const excludeCategories = ['stage', 'student-lessons'];

  // 指定されたカテゴリを除外
  const filteredData = allData.filter(
    (item: any) => !excludeCategories.some((exclude) => hasCategory(item.category, exclude))
  );

  // フィルタリング後の配列をランダムに並び替えて先頭の5件を取得
  const randomOrg = [...filteredData].sort(() => Math.random() - 0.5).slice(0, 5);

  return {
    site_title: '第75回桐朋祭(桐朋祭2026)',
    logo: 'https://pic.atserver186.jp/img/tohofes/tf26-logo-m-v2.webp',
    logo_2: 'https://pic.atserver186.jp/img/tohofes/tf26-logo-s.webp',
    logo_alt: '第75回桐朋祭ロゴ',
    random: randomOrg
  };
}

export const prerender = true;