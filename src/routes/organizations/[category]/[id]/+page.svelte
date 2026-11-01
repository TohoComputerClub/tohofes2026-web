<script lang="ts">
	const { data } = $props();

	const item = $derived(data.item);

	// 複数カテゴリがカンマ区切りで与えられた場合、先頭のカテゴリのみを主カテゴリとして扱う
	function getPrimaryCategory(category: string | null | undefined): string {
		if (!category || typeof category !== 'string') return '';
		return category.split(',')[0].trim();
	}

	// 修正点2: primaryCategory も $derived にする（item に依存するため）
	const primaryCategory = $derived(getPrimaryCategory(item.category));

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import { mdToHtml } from '#lib/utils/markdown.js';

	/*カテゴリ変換マップ*/
	import { getCategoryLabel, getCategoryInfo } from '#lib/utils/orgCategoryMap.js';

	/*s: カルーセル*/
	import Swiper from 'swiper';
	import { Navigation, Pagination, Autoplay } from 'swiper/modules';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let swiperContainer: HTMLDivElement | null = null;
	let swiperInstance: any = null;

	function getImageArray(): string[] {
		if (!item.top_img) {
			return [
				item.thumbnail || 'https://pic.atserver186.jp/img/tohofes/thumbnail/webp/no-image.webp'
			];
		}
		const images = item.top_img.split(',').map((img: string) => img.trim());
		return images.filter((img: string) => img.length > 0);
	}

	const slides = $derived(
		getImageArray().map((imageUrl: string, index: number) => ({
			id: index + 1,
			title: index === 0 ? item.title : `${item.title} - ${index + 1}`,
			image: imageUrl
		}))
	);

	onMount(() => {
		if (swiperContainer) {
			swiperInstance = new Swiper(swiperContainer, {
				modules: [Navigation, Pagination, Autoplay],
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				pagination: { el: '.swiper-pagination', clickable: true },
				autoplay: { delay: 3000, disableOnInteraction: false },
				spaceBetween: 20,
				slidesPerView: 1,
				loop: slides.length > 1 // 画像が1枚の場合はループしない
			});
		}

		return () => {
			if (swiperInstance) {
				swiperInstance.destroy(true, true);
			}
		};
	});
	/*e:カルーセル*/

	/*s: 共有機能*/
	function getShareDescription() {
		if (typeof document === 'undefined') {
			return '';
		}
		const descriptionMeta = document.querySelector("meta[name='description']");
		return descriptionMeta ? descriptionMeta.getAttribute('content') || '' : '';
	}

	async function handleShare() {
		if (typeof navigator === 'undefined' || !navigator.share) {
			console.warn('Web Share API is not supported in this browser.');
			return;
		}

		try {
			await navigator.share({
				title: document.title,
				text: getShareDescription(),
				url: window.location.href
			});
			console.log('共有に成功しました');
		} catch (error) {
			console.error('共有に失敗しました', error);
		}
	}
	/*e: 共有機能*/
</script>

<!-- 以下、HTML部分はそのままでも動作しますが、念のため全体を記載 -->
<svelte:head>
	<title>{item.title} | {data.site_title}</title>
	<meta property="og:title" content="{item.title} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{item.title}</p>
	</div>
	<section class="container mx-auto mt-15 mb-25">
		<div class="orgp-top-content">
			<div class="orgp-top-grid-item">
				<div class="w-full">
					<!--s:カルーセル-->
					<div class="carousel-wrapper">
						<div class="swiper ats-swiper" bind:this={swiperContainer}>
							<div class="swiper-wrapper">
								{#each slides as s}
									<div class="swiper-slide">
										<div class="slide-container">
											<div class="slide-card overflow-hidden rounded-lg bg-white shadow-md">
												{#if s.image}
													<!-- 背景のぼかし画像 -->
													<div
														class="slide-blur-bg"
														style="background-image: url({s.image});"
													></div>

													<!-- メイン画像（アスペクト比を維持） -->
													<div class="slide-img-wrapper">
														<img src={s.image} alt={s.title} class="slide-img" loading="lazy" />
													</div>
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
							<div class="swiper-pagination"></div>
							<div class="swiper-button-prev"></div>
							<div class="swiper-button-next"></div>
						</div>
					</div>
					<!--e:カルーセル-->
				</div>
			</div>
			<div class="orgp-top-grid-item">
				<div class="mb-4">
					{#each item.category
						.split(',')
						.map((c: string) => c.trim())
						.filter((c: string) => c.length > 0) as cat}
						<a href={`/organizations/?category=${cat}`} class="text-decoration-none">
							<span
								class="m-1 inline-flex items-center gap-1 rounded bg-gray-100 text-(--main-text-color) px-0.5 py-px text-xl"
							>
								<i class="fa-solid fa-tag"></i>{getCategoryLabel(cat)}
							</span>
						</a>
					{/each}
				</div>
				<p
					class="text-2xl text-(--main-text-color)"
					title="場所については紙のパンフレットをご覧ください。"
				>
					<i class="fa-solid fa-location-dot mr-1"></i>{item.location}
				</p>
				<hr class="main-hr" />
				<button
					type="button"
					id="pageShareButton"
					onclick={handleShare}
					class="mx-auto my-4 flex cursor-pointer flex-col"
				>
					<div class="text-center text-(--main-text-color)">
						<i class="fa-solid fa-arrow-up-from-bracket text-4xl"></i>
						<p class="text-xl">共有</p>
					</div>
				</button>
				<hr class="main-hr" />
			</div>
		</div>
		{#if item.body && item.body.trim() !== ''}
			<div class="prose mt-8 min-w-full text-xl">
				{@html mdToHtml(item.body)}
			</div>
		{/if}
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li><a href="/organizations">参加団体</a></li>
	<li>{item.title}</li>
</ol>

<style>
	.orgp-top-content {
		display: grid;
		grid-template-columns: 4fr 3fr; /*左:右 = 4:3*/
		gap: 2rem; /*アイテム間に余白を追加する場合*/
	}

	@media (max-width: 768px) {
		.orgp-top-content {
			grid-template-columns: 1fr; /*縦並び*/
		}
	}
	/*swiper*/
	.slide-container {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 */
		background: #1a1a1a;
		overflow: hidden;
		border-radius: 12px;
	}

	/* 背景のぼかし画像 */
	.slide-blur-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		filter: blur(20px) brightness(0.7);
		transform: scale(1.1); /* ぼかしのエッジを隠す */
		z-index: 1;
	}

	/* メイン画像のラッパー */
	.slide-img-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}

	/* メイン画像 */
	.slide-img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain; /* 画像のアスペクト比を維持 */
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}

	@view-transition {
		navigation: auto;
	}

	:global(.ats-swiper) {
		--swiper-navication-color: var(--main-text-color);
		--swiper-pagination-color: var(--main-text-color);
	}

	:global(.ats-swiper .swiper-button-next),
	:global(.ats-swiper .swiper-button-prev) {
		color: var(--sub-text-color);
	}

	/* Swiper navigation & pagination responsive size */
	:global(.ats-swiper .swiper-button-next),
	:global(.ats-swiper .swiper-button-prev) {
		font-size: 2.2rem;
		width: 44px;
		height: 44px;
	}
	:global(.ats-swiper .swiper-pagination-bullet) {
		width: 12px;
		height: 12px;
	}

	@media (max-width: 1024px) {
		:global(.ats-swiper .swiper-button-next),
		:global(.ats-swiper .swiper-button-prev) {
			font-size: 1.5rem;
			width: 32px;
			height: 32px;
		}
		:global(.ats-swiper .swiper-pagination-bullet) {
			width: 9px;
			height: 9px;
		}
	}

	@media (max-width: 600px) {
		:global(.ats-swiper .swiper-button-next),
		:global(.ats-swiper .swiper-button-prev) {
			font-size: 1.1rem;
			width: 24px;
			height: 24px;
		}
		:global(.ats-swiper .swiper-pagination-bullet) {
			width: 7px;
			height: 7px;
		}
	}

	.carousel-wrapper {
		width: 60vw;
		margin: 0 auto;
	}

	.slide-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	@media (max-width: 1024px) {
		.carousel-wrapper {
			width: 90vw;
		}
	}
</style>
