import { fetchOrganizations } from '#lib/server/organizations.js';

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

export async function load({ url }) {
	const categoryParam = url.searchParams.get('category');
	const search = url.searchParams.get('search');

	//除外カテゴリ
	const excludeCategories = ['stage', 'student-lessons'];

	//全データを取得し、指定されたカテゴリを除外
	const allData = await fetchOrganizations();
	const allResults = allData.filter(
		(item: any) => !excludeCategories.some((exclude) => hasCategory(item.category, exclude))
	);

	let results = allResults;

	//category/typeでの検索（複数カテゴリに対応）
	if (categoryParam) {
		const selectedCategories = getCategories(categoryParam);
		results = allResults.filter((item: any) => {
			// 選択されたカテゴリのいずれかに該当するか、またはtypeが一致するかをチェック
			return selectedCategories.some((cat) => hasCategory(item.category, cat) || item.type === cat);
		});
	}

	//キーワード検索
	if (search) {
		const lower = search.toLowerCase();
		results = results.filter(
			(item: any) =>
				item.title?.toLowerCase().includes(lower) ||
				item.body?.toLowerCase().includes(lower) ||
				item.location?.toLowerCase().includes(lower)
		);
	}

	return { results, allResults, category: categoryParam, search };
}
