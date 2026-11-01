import { SERVER_LOCATION } from '$app/env/private';
import type { PageServerLoad } from './$types';
import promises from 'fs';
import path from 'path';

export const load: PageServerLoad = async () => {
    try {
        //ファイルパスを解決（プロジェクトのルートディレクトリ基準）
        const filePath = path.resolve('src/lib/server/data/credit.json');
        
        //ファイルを非同期で読み込み
        const fileContent = await promises.promises.readFile(filePath, 'utf-8');
        
        //JSON文字列をオブジェクトに変換
        const items = JSON.parse(fileContent);
        
        return {
            //サーバーに設定した名前を表示(/etc/environment)
            serverLocation: SERVER_LOCATION || 'Unknown Server',
            items
        };
    } catch (error) {
        throw new Error(`データの取得に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
};
