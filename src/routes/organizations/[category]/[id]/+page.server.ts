import { fetchOrganizations } from '#lib/server/organizations.js';

function normalizeCategory(category?: string) {
	if (!category || typeof category !== 'string') return '';
	return category.split(',')[0].trim();
}

export async function load({ params }) {
	const { category, id } = params;

	const orgs = await fetchOrganizations();

	const item = orgs.find((o:any) => normalizeCategory(o.category) === category && String(o.id) === id);

    /*記事が見つからなかった時の処理*/
    if (!item){
        return {
            status: 404,
            error: new Error("参加団体が見つかりませんでした")
        };
    }

    return { item };
}
