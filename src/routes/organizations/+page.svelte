<script lang="ts">
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import { getUrl } from '#lib/utils/getUrl.js';
	import { page } from '$app/state';

	import Modal from '#lib/components/Modal_Search.svelte';
	let show = $state(false);

	let pageTitle = '参加団体';

	import { getCategoryLabel, getCategoryInfo } from '#lib/utils/orgCategoryMap.js';

	/*s: 絞り込み検索*/
	type QueryKey = 'category' | 'place' | 'date';

	// 現在選択されているカテゴリ（リアクティブ状態）
	let selectedCategories = $state<string[]>([]);

	onMount(() => {
		// 初期値をURLから取得
		const categoryParam = page.url.searchParams.get('category');
		if (categoryParam) {
			selectedCategories = categoryParam
				.split(',')
				.map(cat => cat.trim())
				.filter(cat => cat.length > 0);
		}
	});

	// カテゴリチェックボックスの状態を切り替える
	function toggleCategory(categoryValue: string): void {
		const index = selectedCategories.indexOf(categoryValue);
		
		if (index > -1) {
			selectedCategories.splice(index, 1);
		} else {
			selectedCategories.push(categoryValue);
		}

		// URLを更新（リロードなし）
		updateUrl();
	}

	// URLを更新
	function updateUrl(): void {
		const searchParams = new URLSearchParams(page.url.searchParams.toString());
		if (selectedCategories.length > 0) {
			searchParams.set('category', selectedCategories.join(','));
		} else {
			searchParams.delete('category');
		}
		
		window.history.replaceState({}, '', `?${searchParams.toString()}`);
	}

	// カテゴリがチェックされているか判定
	function isCategoryChecked(categoryValue: string): boolean {
		return selectedCategories.includes(categoryValue);
	}

	// フィルタリング済み結果を計算
	const filteredResults = $derived.by(() => {
		let results = data.allResults || data.results || [];
		
		// カテゴリでフィルタリング
		if (selectedCategories.length > 0) {
			results = results.filter((item: any) => {
				const itemCategories = (item.category || '')
					.split(',')
					.map((c: string) => c.trim())
					.filter((c: string) => c.length > 0);
				return selectedCategories.some((cat) => 
					itemCategories.includes(cat) || item.type === cat
				);
			});
		}
		
		// キーワード検索
		const search = page.url.searchParams.get('search');
		if (search) {
			const lower = search.toLowerCase();
			results = results.filter((item: any) =>
				item.title?.toLowerCase().includes(lower) ||
				item.body?.toLowerCase().includes(lower) ||
				item.location?.toLowerCase().includes(lower)
			);
		}
		
		return results;
	});

	// この close 関数を追加または修正
	const close = () => {
		show = false;
	};
	/*e: 絞り込み検索*/
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<Modal bind:showModal={show}>
		<p class="mb-4 text-center text-xl font-bold text-(--main-text-color)">絞り込み検索</p>
		<div>
			<div class="mb-2">
				<p class="tf26-dialog-title mb-2">カテゴリー</p>
				<p class="text-lg text-(--main-text-color)">参加団体</p>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="general"
						checked={isCategoryChecked('general')}
						onchange={(e) => toggleCategory('general')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">一般</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="food"
						checked={isCategoryChecked('food')}
						onchange={(e) => toggleCategory('food')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">飲食</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="bands"
						checked={isCategoryChecked('bands')}
						onchange={(e) => toggleCategory('bands')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">バンド</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="イベント"
						checked={isCategoryChecked('イベント')}
						onchange={(e) => toggleCategory('イベント')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">イベント</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="other"
						checked={isCategoryChecked('other')}
						onchange={(e) => toggleCategory('other')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">その他</p>
				</label>
				<p class="text-lg text-(--main-text-color) mt-3">企画カテゴリ</p>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="展示"
						checked={isCategoryChecked('展示')}
						onchange={(e) => toggleCategory('展示')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">展示</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="パフォーマンス"
						checked={isCategoryChecked('パフォーマンス')}
						onchange={(e) => toggleCategory('パフォーマンス')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">パフォーマンス</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="体験"
						checked={isCategoryChecked('体験')}
						onchange={(e) => toggleCategory('体験')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">体験</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="アクティビティ"
						checked={isCategoryChecked('アクティビティ')}
						onchange={(e) => toggleCategory('アクティビティ')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">アクティビティ</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="屋台"
						checked={isCategoryChecked('屋台')}
						onchange={(e) => toggleCategory('屋台')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">屋台</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="喫茶"
						checked={isCategoryChecked('喫茶')}
						onchange={(e) => toggleCategory('喫茶')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">喫茶</p>
				</label>
				<p class="text-lg text-(--main-text-color) mt-3">企画特記事項</p>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="グループ向け"
						checked={isCategoryChecked('グループ向け')}
						onchange={(e) => toggleCategory('グループ向け')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">グループ向け</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="受験生向け"
						checked={isCategoryChecked('受験生向け')}
						onchange={(e) => toggleCategory('受験生向け')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">受験生向け</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="配布物あり"
						checked={isCategoryChecked('配布物あり')}
						onchange={(e) => toggleCategory('配布物あり')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">配布物あり</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="所要時間短め"
						checked={isCategoryChecked('所要時間短め')}
						onchange={(e) => toggleCategory('所要時間短め')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">所要時間短め</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="SNS映え"
						checked={isCategoryChecked('SNS映え')}
						onchange={(e) => toggleCategory('SNS映え')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">SNS映え</p>
				</label>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="有志団体"
						checked={isCategoryChecked('有志団体')}
						onchange={(e) => toggleCategory('有志団体')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">有志団体</p>
				</label>
				<p class="text-lg text-(--main-text-color) mt-3">ブログ</p>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						value="article"
						checked={isCategoryChecked('article')}
						onchange={(e) => toggleCategory('article')}
						class="w-4 h-4"
					/>
					<p class="text-sm text-(--main-text-color)">参加団体特設記事</p>
				</label>
			</div>
			<!--
			<div>
				<p class="tf26-dialog-title mb-2">場所</p>
				test
			</div>
			-->
		</div>
		<!--s:閉じる/リセット-->
		<div class="mt-auto">
			<hr class="main-hr" />
			<div class="flex">
				<a href="/organizations/" class="link-main">
					<div class="link-main-underline">
						<i class="fa-solid fa-arrow-rotate-left"></i>
						<span>リセット</span>
					</div>
				</a>
				<button onclick={close} class="link-main" type="button">
					<div class="link-main-underline">
						<i class="fa-solid fa-xmark"></i>
						<span>閉じる</span>
					</div>
				</button>
			</div>
		</div>
		<!--e:閉じる/リセット-->
	</Modal>

	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{pageTitle}</p>
	</div>
	<section class="container mx-auto mt-10 mb-25 rounded bg-white p-4">
		<form class="s-search-form mb-4" action="/organizations/" method="GET">
			<input
				class="s-search-input"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="検索..."
			/>
			<button
				type="button"
				class="m-search-button mr-4"
				onclick={() => (show = true)}
				title="絞り込み検索する"><i class="fa-solid fa-sliders"></i></button
			>
			<button class="m-search-button" type="submit" title="検索する"
				><i class="fas fa-search"></i></button
			>
		</form>

		<p class="text-(--main-text-color)"><i class="fa-solid fa-sliders"></i>を押すことで絞り込み検索ができます。</p>

		<p class="my-4">{filteredResults.length}件の {pageTitle} が見つかりました。</p>
		<div class="flex flex-wrap justify-center gap-4">
			{#each filteredResults as item}
				<article class="sp-search-result-card">
					<a href={getUrl(item)} class="sp-search-result-link-overlay"
						><p class="hidden">hidden:エラー対策</p></a
					>
					<div class="mb-2 flex">
						<p class="w-full text-xl font-bold text-(--main-text-color)">{item.title}</p>
						<p class="text-right whitespace-nowrap text-(--main-text-color)">
							<i class="fa-solid fa-location-dot mr-1 text-xs"></i>{item.location}
						</p>
					</div>
					<div class="flex">
						<div class="mr-2 flex-col" style="min-width: 0; max-width: 100%;">
						<div class="sp-search-result-text mb-4 text-xs text-(--main-text-color) flex flex-wrap gap-2">
							{#each item.category.split(',').map((c: string) => c.trim()).filter((c: string) => c.length > 0) as cat}
								<span class="text-xs inline-flex items-center gap-1 px-0.5 py-px mx-1 bg-gray-100 rounded">
									<i class="fa-solid fa-tag"></i>{getCategoryLabel(cat)}
								</span>
							{/each}
						</div>
							<p class="sp-search-result-text text-left-decoration items-end text-sm text-gray-600">
								{item.body}
							</p>
						</div>
						<div class="mr-0 items-end">
							<div
								style="width: 120px; height: 120px; position: relative; background-color: #f0f0f0; border-radius: 8px; overflow: hidden;"
							>
								<img
									src={item.thumbnail ||
										'https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp'}
									alt="{item.title}サムネイル"
									class="ml-auto rounded-lg"
								/>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	/* アクティブなリンクのスタイル */
	.active {
		font-weight: bold;
		background-color: color-mix(in srgb, var(--main-text-color) 15%, transparent);
		color: white;
	}

	/* sp-refined-date と sp-refined-date-s 用のアクティブスタイル */
	.sp-refined-date.active,
	.sp-refined-date-s.active {
		font-weight: bold;
		color: #0066cc;
		position: relative;
	}
</style>
