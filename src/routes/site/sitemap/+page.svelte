<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import { getUrl } from '#lib/utils/getUrl.js';
	import { page } from '$app/state';

	let pageTitle = 'サイトマップ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-25 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{pageTitle}</p>
	</div>
	<section class="container mx-auto mt-15 mb-25">
		<div class="sitemap-container">
			<div class="sitemap-content">
				<h2
					class="border-l-[3px] border-(--main-text-color) pl-2 text-lg font-bold tracking-[3px] text-(--main-text-color)"
				>
					ご案内
				</h2>
				<ul class="sitemap-ul">
					<li>
						<a href="/about">
							<span>桐朋祭とは</span>
						</a>
					</li>
					<li>
						<a href="/vistor" target="_blank">
							<span>来場者の皆様へ</span>
						</a>
					</li>
					<li>
						<a href="/access">
							<span>本校へのアクセス</span>
						</a>
					</li>
					<li>
						<a href="/timetable">
							<span>企画タイムテーブル</span>
						</a>
					</li>
					<li>
						<a href="/news" target="_blank">
							<span>お知らせ</span>
						</a>
					</li>
					<li>
						<a href="/site/info" target="_blank">
							<span>サイト情報</span>
						</a>
					</li>
					<li>
						<a href="/site/contact">
							<span>お問い合わせ</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="sitemap-content">
				<h2
					class="mt-2 border-l-[3px] border-(--main-text-color) pl-2 text-lg font-bold tracking-[3px] text-(--main-text-color)"
				>
					参加団体
				</h2>
				<ul class="sitemap-ul">
					{#if data.random && data.random.length > 0}
						{#each data.random as item}
							<li class="flex flex-col gap-2.5">
								<a href={getUrl(item)}>
									<span>{item.title}</span>
								</a>
							</li>
						{/each}
					{:else}
						<p>お知らせの取得に失敗しました</p>
					{/if}
					<li class="flex flex-col gap-2.5">
						<a href="/organizations" class="font-bold">
							<i class="fa-solid fa-list"></i><span>一覧はこちら</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="sitemap-content">
				<h2
					class="mt-2 border-l-[3px] border-(--main-text-color) pl-2 text-lg font-bold tracking-[3px] text-(--main-text-color)"
				>
					各種SNS / リンク
				</h2>
				<ul class="sitemap-ul">
					<li>
						<a href="https://x.com/tohofes_2026" target="_blank">
							<i class="fa-brands fa-x-twitter mr-1 text-xs"></i>
							<span>X(Twitter)</span>
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/tohofes_2026/" target="_blank">
							<i class="fa-brands fa-instagram mr-1 text-xs"></i>
							<span>Instagram</span>
						</a>
					</li>
					<li>
						<a href="http://toho.ed.jp" target="_blank">
							<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
							<span>桐朋中学校・高等学校HP</span>
						</a>
					</li>
					<li>
						<a href="https://2026.tcc-archive.club" target="_blank">
							<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
							<span>コンピューター部桐朋祭用特設HP</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	.sitemap-container {
		display: flex;
	}

	.sitemap-content {
		display: flex;
		flex-direction: column;
		width: calc(100% / 3);
	}

	.sitemap-ul {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	@media (max-width: 768px) {
		.sitemap-container {
			flex-direction: column;
		}

		.sitemap-content {
			width: 100%;
		}
	}
</style>
