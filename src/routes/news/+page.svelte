<script lang="ts">
	import type { Post } from '$lib/types';

	// Svelte 5 の $props() で data を受け取る
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';

	// data.posts を使う（+page.server.ts から渡される）
	const posts = $derived(data.posts);

	function sanitizeTransitionName(str: string): string {
		return str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
	}

	let pageTitle = 'お知らせ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{pageTitle}</p>
	</div>
	<section class="container mx-auto mt-15 mb-25">
		<div class="mb-4 flex">
			<a href="https://legacy.atserver186.jp/public/atserver186.jp/news/" target="_blank" class="text-lg"
				><i class="fa-solid fa-folder text-bace mr-1"></i><span class="underline">過去のお知らせはアーカイブされました。</span></a
			>
		</div>
		{#each posts as post}
			<ul>
				<li class="mx-auto mb-4 w-full list-none" style="view-transition-name: newsp-hero;">
					<a href="/news/{post.category}/{post.slug}">
						<div
							class="news-list flex border-l-2 pl-4"
							style="border-left-color: var(--main-text-color);"
						>
							<div class="news-list-date-box mr-4">
								<span class="news-list-month"
									>{String(new Date(post.date).getMonth() + 1).padStart(2, '0')}</span
								>
								<span class="news-list-slash">/</span>
								<span class="news-list-date"
									>{String(new Date(post.date).getDate()).padStart(2, '0')}</span
								>
							</div>
							<div class="truncate-parent flex-col">
								<p
									class="truncate-title news-list-title ml-2 font-bold"
									style="view-transition-name: {sanitizeTransitionName(post.title)}-hero;"
								>
									{post.title}
								</p>
								<p class="truncate-heading news-list-heading mb-2">{post.heading}</p>
							</div>
							<div class="news-list-icon my-auto ml-auto">
								<i class="fa-solid fa-angles-right left-auto mr-2"></i>
							</div>
						</div>
					</a>
				</li>
			</ul>
		{/each}
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
