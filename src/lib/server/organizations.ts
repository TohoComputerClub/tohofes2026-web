import { readJsonData } from '$lib/server/data';

export async function fetchOrganizations() {
	try {
		return readJsonData<any[]>('organization.json');
	} catch (error) {
		console.error('参加団体情報の取得に失敗しました。:', error);
		return [];
	}
}
