<script lang="ts">
	import type { Post } from '$lib/types';

	interface TableOfContents {
		title: string;
		id: string;
		level: number;
		children?: TableOfContents[];
	}

	// 型定義（htmlプロパティを追加）
	let {
		data
	}: {
		data: { post: Post & { html: string }; site_title: string; tableOfContents: TableOfContents[] };
	} = $props();
	const post = $derived(data.post);
	const tableOfContents = $derived(data.tableOfContents);

	let pageTitle = $derived(post.title);

	function sanitizeTransitionName(str: string): string {
		return str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
	}

	const inputdate = new Date(post.date);

	const formattedDate = new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(inputdate);
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{post.title}</p>
	</div>
	<article class="container mx-auto mt-15 mb-25">
		<div class="mb-4 flex gap-2">
			<p class="w-fit rounded-2xl border border-gray-500 px-2 py-1 text-xs">
				<i class="fa-regular fa-circle-user mr-1"></i>{post.author}
			</p>
			<a
				href="/news/category/{post.category}"
				class="w-fit rounded-2xl border border-gray-500 px-2 py-1 text-xs"
				><i class="fa-solid fa-folder-open mr-1"></i>
				{post.category}</a
			>
		</div>
		<p class=""><i class="fa-regular fa-clock"></i>{formattedDate}{#if post.edited === 1}<span class="ml-2 w-fit rounded-2xl border border-gray-500 px-1 text-xs"><i class="fa-solid fa-clock-rotate-left mr-1"></i>編集済</span>{/if}</p>

		{#if tableOfContents && tableOfContents.length > 0}
			<nav class="table-of-contents mt-2 mb-6 rounded-xl bg-gray-100 p-4">
				<h2 class="mb-3 text-lg font-bold"><i class="fa-solid fa-list-ul mr-1"></i>目次</h2>
				<ul class="space-y-1">
					{#each tableOfContents as item}
						<li class="ml-0">
							<a href="#{item.id}" class="text-black hover:underline">{item.title}</a>
							{#if item.children && item.children.length > 0}
								<ul class="ml-4 space-y-1">
									{#each item.children as child}
										<li>
											<a href="#{child.id}" class="text-black hover:underline">{child.title}</a>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		{/if}

		<div class="markdown-content">
			{@html post.html}
		</div>
	</article>
</main>

<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li><a href="/news">お知らせ</a></li>
	<li><a href="/news/category/{post.category}">{post.category}</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	/* マークダウンのスタイル */
	.markdown-content :global(h1) {
		font-size: 1.8rem;
		font-weight: bold;
		margin: 1.5rem 0 1rem 0;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	.markdown-content :global(h2) {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 1.25rem 0 0.75rem 0;
	}

	.markdown-content :global(h3) {
		font-size: 1.25rem;
		font-weight: bold;
		margin: 1rem 0 0.5rem 0;
	}

	.markdown-content :global(p) {
		line-height: 1.7;
		margin: 0.75rem 0;
	}

	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		margin: 0.75rem 0;
		padding-left: 1.5rem;
	}

	.markdown-content :global(li) {
		margin: 0.25rem 0;
		line-height: 1.6;
	}

	.markdown-content :global(blockquote) {
		border-left: 4px solid #9ca3af;
		margin: 1rem 0;
		padding-left: 1rem;
		font-style: italic;
		color: #4b5563;
	}

	.markdown-content :global(code) {
		background-color: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.9em;
	}

	.markdown-content :global(pre) {
		background-color: #1f2937;
		color: #f3f4f6;
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.markdown-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		color: inherit;
	}

	.markdown-content :global(a) {
		color: #2563eb;
		text-decoration: underline;
	}

	.markdown-content :global(a:hover) {
		color: #1d4ed8;
	}

	.markdown-content :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 1rem 0;
	}

	.markdown-content :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1rem 0;
	}

	.markdown-content :global(th),
	.markdown-content :global(td) {
		border: 1px solid #e5e7eb;
		padding: 0.5rem;
		text-align: left;
	}

	.markdown-content :global(th) {
		background-color: #f3f4f6;
		font-weight: bold;
	}

	.markdown-content :global(hr) {
		margin: 2rem 0;
		border: none;
		border-top: 1px solid #e5e7eb;
	}
</style>
