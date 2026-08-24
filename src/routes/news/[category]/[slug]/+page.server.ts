import { getPostBySlug } from '$lib/news';
import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import { marked } from 'marked';
import { readFileSync } from 'fs';
import { join } from 'path';
import fm from 'front-matter';
import type { FrontMatter } from '$lib/types';

function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

interface TableOfContents {
	title: string;
	id: string;
	level: number;
	children?: TableOfContents[];
}

function parseTableOfContents(html: string): { toc: TableOfContents[]; updatedHtml: string } {
	const headings: TableOfContents[] = [];
	let updatedHtml = html;
	let h1Count = 0;
	let h2Count = 0;

	const h1Regex = /<h1[^>]*>([^<]+)<\/h1>/g;
	updatedHtml = updatedHtml.replace(h1Regex, (match, text) => {
		h1Count++;
		const id = `toc-m${h1Count}`;
		return `<h1 id="${id}">${text}</h1>`;
	});

	const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/g;
	updatedHtml = updatedHtml.replace(h2Regex, (match, text) => {
		h2Count++;
		const id = `toc-s${h2Count}`;
		return `<h2 id="${id}">${text}</h2>`;
	});

	// 更新されたHTMLから見出しを再度抽出して目次を生成
	const headingRegex = /<h([12]).*?id="([^"]*)"[^>]*>([^<]+)<\/h\1>/g;
	let match;

	while ((match = headingRegex.exec(updatedHtml)) !== null) {
		const level = parseInt(match[1]);
		const id = match[2];
		const title = match[3];

		if (level === 1) {
			headings.push({ title, id, level, children: [] });
		} else if (level === 2 && headings.length > 0) {
			const lastH1 = headings[headings.length - 1];
			if (!lastH1.children) lastH1.children = [];
			lastH1.children.push({ title, id, level });
		}
	}

	return { toc: headings, updatedHtml };
}

export async function load({ params }: { params: { category: string; slug: string } }) {
	let post: Post | undefined = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, '記事が見つかりません');
	}

	if (post.category !== params.category){
		throw error(404, 'error_test')
	}

	// ビルド後にcontentが空の場合は、ファイルシステムから直接読み込む
	if (!post.content) {
		try {
			const postsDir = join(process.cwd(), 'src', 'posts');
			const filePath = join(postsDir, `${params.slug}.md`);

			const fileContent = readFileSync(filePath, 'utf-8');
			const parsed = fm<FrontMatter>(fileContent);
			post.content = parsed.body;
		} catch (err) {
			console.error(`Failed to read markdown file for slug: ${params.slug}`, err);
			post.content = '';
		}
	}

	// markedでマークダウンをHTMLに変換
	let htmlContent = await marked(post.content);

	// 見出しにIDを付与して目次を生成
	const { toc, updatedHtml } = parseTableOfContents(htmlContent);

	return {
		post: {
			...post,
			html: updatedHtml
		},
		tableOfContents: toc
	};
}