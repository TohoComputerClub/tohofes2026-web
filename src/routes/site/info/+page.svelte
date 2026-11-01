<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	// 型定義
	type Item = {
		category: string;
		name: string;
	};

	let pageTitle = 'サイト情報';

	export let data;
	const { serverLocation, items } = data as { serverLocation: string; items: Item[] };

	// カテゴリー別にフィルタリング
	$: siteDevItems = items.filter((item: Item) => item.category === 'site_dev');
	$: siteDesignItems = items.filter((item: Item) => item.category === 'site_disign');
	$: manageItems = items.filter((item: Item) => item.category === 'manage');
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
		<div class="mt-4">
			<div class="mb-4 rounded-2xl bg-gray-50 p-4">
				<p>Connected to: {data.serverLocation}</p>
			</div>
			<div class="mb-4 rounded-2xl bg-gray-50 p-4">
				<h2 class="text-lg font-semibold">推奨動作環境</h2>
				<p class="mt-1 text-sm">
					本サイトは、Microsoft Edge/Google Chrome/Safari/Mozilla
					Firefoxの最新版で動作することを確認しています。（拡張機能やFirefoxの派生形ブラウザなどでの動作保証はできかねます。）お使いのブラウザやOSによっては、見方が異なったり、正常に動作しなかったりすることがあります。
					<br /><br />
					また本サイトは、より快適にご利用いただくためにJavaScriptを使用しています。お使いのブラウザの設定においてJavaScriptが有効となってない場合、正しく表示、または操作できないことがあります。
				</p>
			</div>
			<div class="mb-4 rounded-2xl bg-gray-50 p-4">
				<h2 class="text-lg font-semibold">制作</h2>
				<div class="mt-4 text-lg">
					<span class="font-bold">ホームページ開発:</span>
					{#each siteDevItems as item}
						<ul>
							<li>{item.name}</li>
						</ul>
					{/each}
				</div>
				<div class="mt-4 text-lg">
					<span class="font-bold">ホームページデザイン:</span>
					{#each siteDesignItems as item}
						<ul>
							<li>{item.name}</li>
						</ul>
					{/each}
				</div>
				<div class="mt-4 text-lg">
					<span class="font-bold">ホームページ管理/運用:</span>
					{#each manageItems as item}
						<ul>
							<li>{item.name}</li>
						</ul>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
