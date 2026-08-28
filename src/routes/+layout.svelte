<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	/*ローディング*/
	import { isVisible, hasInitialized } from '$lib/stores/loader';
	import Loading from '$lib/components/Loading.svelte';
	/*独自スタイル*/
	import './layout.css';
	import './icon.css';
	import './components.css';
	/*favicon*/
	import favicon from '$lib/assets/favicon.ico';
	import { get } from 'svelte/store';
	/*NProgress*/
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	//AOS(Animate On Scroll)
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	/*Sveltekit-View-Transition(ページ遷移時のアニメーション)*/
	import { setupViewTransition } from 'sveltekit-view-transition';
	/*モーダル*/
	import Modal from '$lib/components/Modal.svelte';
	/*URL生成*/
	import { getUrl } from '$lib/utils/getUrl';
	/*SEO*/
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	//GA
	import { browser } from '$app/environment';

	/*s:NProgressの設定*/
	beforeNavigate(() => {
		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
		// ページ遷移時にメニューを閉じる
		open = false;
		otherOpen = false;
		//GA
		if (browser && window.gtag) {
      	window.gtag('config', GA_MEASUREMENT_ID, {
        	page_path: window.location.pathname,
     	});
    }
	});
	/*e:NProgressの設定*/

	type RandomItem = { title: string; type: string; id: string; category?: string };
	let { data, children } = $props<{ data: { random?: RandomItem[] } }>();
	let accordionOpen = $state(false);

	/*s:ハンバーガーメニュー*/
	let open = $state(false);
	let isOtherClosing = $state(false);
	let otherOpen = $state(false);
	let pendingOpen = false;
	/*e;ハンバーガーメニュー*/

	/*s:target="_blank"モーダル*/
	let targetUrl = $state('');
	let showLinkModal = $state(false);
	let skipExternalLinkConfirmation = $state(false);
	/*e:target="_blank"モーダル*/

	/*s:ヘッダーその他メニュー*/
	function closeOther(goBackToMenu: boolean = false) {
		if (goBackToMenu) pendingOpen = true;
		otherOpen = false;
	}
	/*e:ヘッダーその他メニュー*/

	/*s:スクロールでヘッダーサイズ変更*/
	let scrolled = $state(false);

	const headerClass = $derived(
		`fixed top-0 right-0 left-0 z-20 border border-black/10 bg-white backdrop-blur-md transition-all duration-500 overflow-hidden` +
			(scrolled ? ' scroll-nav' : '') +
			(otherOpen
				? ' max-h-[100vh] rounded-b-[1.0rem]'
				: open
					? ' max-h-[400px] rounded-b-[1.0rem]'
					: ' max-h-[70px]') //メニュー展開前のheaderの高さ
	);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	/*e:スクロールでヘッダーサイズ変更*/

	/*s:モーダル*/
	let showModal = $state(false);
	let modalType = $state('');

	function openModal(type: string) {
		showModal = true;
		modalType = type;
	}
	/*e:モーダル*/

	/*s:AOSの初期化*/
	onMount(() => {
		AOS.init({
			// オプション（任意）
			duration: 800, //アニメーションの時間（ミリ秒）
			once: false //何度でもアニメーションを発火させる
		});
	});
	/*e:AOSの初期化*/

	/*s:View Transition*/
	setupViewTransition();
	/*e:View Transition*/

	/*s:ローディングアニメーション*/
	onMount(() => {
		// localStorage をチェック
		const alreadySeen = localStorage.getItem('hasSeenIntro');

		if (!alreadySeen) {
			//初回アクセスの場合
			isVisible.set(true);

			//動画を視聴済みのフラグを追加
			localStorage.setItem('hasSeenIntro', 'true');

			//動画の長さに合わせて自動で消す（動画のendedイベントを使わない場合の保険）
			setTimeout(() => {
				isVisible.set(false);
			}, 2000);
		}
	});
	/*e:ローディングアニメーション*/

	/*s:target="_blank"モーダル*/
	//外部リンク確認モーダルを非表示にされているかの情報をLocalStorageから取得
	onMount(() => {
		skipExternalLinkConfirmation = localStorage.getItem('skipExternalLinkConfirmation') === 'true';
	});

	function openExternalLink(event: MouseEvent) {
		//クリックされた要素から一番近いaタグを探す
		const anchor = (event.target as HTMLElement).closest('a');
		//`target="_blank"`が設定されている場合にのみ発火
		if (anchor && anchor.target === '_blank') {
			if (skipExternalLinkConfirmation) {
				window.open(anchor.href, '_blank', 'noopener,noreferrer');
				return;
			}

			event.preventDefault();
			targetUrl = anchor.href;
			showLinkModal = true;
		}
	}

	function copyLink() {
		navigator.clipboard.writeText(targetUrl);
		alert('URLをコピーしました'); //将来的にはトースト通知などに変更したい
		showLinkModal = false;
	}

	function openLink() {
		if (skipExternalLinkConfirmation) {
			localStorage.setItem('skipExternalLinkConfirmation', 'true');
		}
		window.open(targetUrl, '_blank', 'noopener,noreferrer');
		showLinkModal = false;
	}

	/*e:target="_blank"モーダル*/

	onNavigate((navigation) => {
		// ブラウザが View Transitions API に対応していない場合は何もしない
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	//GA
	const GA_MEASUREMENT_ID = 'G-LE8CXZXGWS';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.atserver186.jp/libs/fontawesome/css/all.min.css" />
	<link rel="icon" href={favicon} />
	<!--s:SEO-->
	<!--各ページでheadに内容がなければ以下の内容が表示される-->
	<title>第75回桐朋祭(桐朋祭2026)</title>
	<meta
		name="description"
		content="桐朋中学校・高等学校の学園祭「桐朋祭」の公式ホームページです。2026/06/06(土)-08(月)開催！"
	/>
	<meta name="keywords" content="桐朋,桐朋中学校,桐朋高校,桐朋中学高等学校,桐朋祭,学園祭,文化祭" />
	<meta property="og:site_name" content="第75回桐朋祭(桐朋祭2026)" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://tohofes.jp/ogp.png" />
	<meta property="og:title" content="第75回桐朋祭(桐朋祭2026)" />
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@tohofes_2026" />
	<!--e:SEO-->
	<!--s: GA-->
	<script async src="https://www.googletagmanager.com/gtag/js?id={GA_MEASUREMENT_ID}"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){ dataLayer.push(arguments); }
		gtag('js', new Date());
		gtag('config', '{GA_MEASUREMENT_ID}');
	</script>
	<!--e: GA-->
</svelte:head>

<Modal bind:showModal>
	{#if modalType === 'search'}
		<form class="s-search-form mb-4" action="/organizations/" style="border-radius: 50px !important; border: none !important;" method="GET">
			<input
				class="s-search-input"
				type="text"
				id="searchTerm"
				name="search"
				placeholder="検索..."
			/>
			<button class="m-search-button" type="submit" title="検索する"
				><i class="fas fa-search"></i></button
			>
		</form>
		<div class="relative m-auto mt-10 mb-4 w-full bg-white/50 rounded-t-2xl">
			<!-- 左下の角 -->
			<span
				class="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-(--main-text-color)"
			></span>
			<!-- 右下の角 -->
			<span
				class="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-(--main-text-color)"
			></span>
			<!-- コンテンツ -->
			<div class="flex justify-center gap-4 font-bold text-(--main-text-color)">
				<div class="tp-search-method">
					<a href="/organizations" class="dash-link">
						<i class="fa-solid fa-list"></i>
						<p>絞り込む</p>
					</a>
				</div>
				<div class="tp-search-method">
					<a href="/timetable" class="dash-link">
						<i class="fa-solid fa-list"></i>
						<p>企画タイムテーブルから<br />探す</p>
					</a>
				</div>
			</div>
		</div>
	{/if}
</Modal>

<svelte:window onclick={openExternalLink} />

{#if showLinkModal}
	<div class="modal-backdrop">
		<div class="main-modal">
			<p class="mb-4 text-center text-xl font-bold text-(--main-text-color)">
				外部サイトへ移動しますか？
			</p>
			<hr class="main-hr" />
			<p class="mb-5 text-[0.8rem] leading-[1.8rem] break-all text-gray-600">{targetUrl}</p>

			<label class="group mb-5 flex cursor-pointer items-center">
				<input class="peer hidden" type="checkbox" bind:checked={skipExternalLinkConfirmation} />

				<span
					class="relative flex h-8 w-8 items-center justify-center rounded-md border-2 border-gray-400 bg-gray-100 shadow-md transition-all duration-500 peer-checked:border-(--main-text-color) peer-checked:bg-(--main-text-color) peer-hover:scale-105"
				>
					<span
						class="absolute inset-0 rounded-md bg-linear-to-br from-white/30 to-white/10 opacity-0 transition-all duration-500 peer-checked:animate-pulse peer-checked:opacity-100"
					></span>

					<svg
						fill="currentColor"
						viewBox="0 0 20 20"
						class="hidden h-5 w-5 scale-50 transform text-white transition-transform duration-500 peer-checked:block peer-checked:scale-100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clip-rule="evenodd"
							d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
							fill-rule="evenodd"
						></path>
					</svg>
				</span>

				<span class="ml-3 font-medium text-gray-700 transition-colors duration-300">
					以後確認なしでリンクを開く
				</span>
			</label>

			<div class="redirect-link-actions">
				<button onclick={openLink} class="link-main">
					<div class="link-main-underline">
						<i class="fa-solid fa-up-right-from-square"></i>
						<span>リンクを開く</span>
					</div>
				</button>
				<button onclick={copyLink} class="link-main">
					<div class="link-main-underline">
						<i class="fa-solid fa-copy"></i>
						<span>リンクをコピー</span>
					</div>
				</button>
				<button onclick={() => (showLinkModal = false)} class="link-main">
					<div class="link-main-underline">
						<i class="fa-solid fa-arrow-right-long"></i>
						<span>キャンセル</span>
					</div>
				</button>
			</div>
		</div>
	</div>
{/if}

{#if $isVisible}
	<Loading />
{/if}

<header class={headerClass}>
	<div class="flex items-center justify-between px-2 py-2">
		<!--s:ロゴ-->
		<a href="/" class="flex shrink-0 whitespace-nowrap transition">
			<img src={data.logo} alt="" class="ml-2 h-13 w-auto rounded-xl" />
			<!--<p class="m-auto header-text">TOHO FES 2026</p>-->
		</a>
		<!--e:ロゴ-->
		<!---->
		<div class="flex items-center md:hidden">
			<!--s:スマホ用検索ボタン-->
			<button onclick={() => openModal('search')} class="mr-4 cursor-pointer" title="検索する">
				<i class="fa-solid fa-magnifying-glass text-(--main-text-color)"></i>
			</button>
			<!--e:スマホ用検索ボタン-->
			<!-- ハンバーガー / その他メニュー閉じる（スマホ用） -->
			<div class="grid">
				{#if !otherOpen}
					<button
						class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
						transition:fade={{ duration: 300 }}
						onclick={() => (open = !open)}
						title="メニュー"
					>
						<div class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center">
							<input class="peer hidden" type="checkbox" checked={open} />
							<div
								class="header-hamburger h-0.5 w-[50%] origin-left translate-y-[0.45rem] rounded-sm bg-black transition-all duration-300 peer-checked:-rotate-45"
							></div>
							<div
								class="header-hamburger h-0.5 w-[50%] origin-center rounded-md bg-black transition-all duration-300 peer-checked:hidden"
							></div>
							<div
								class="header-hamburger h-0.5 w-[50%] origin-left -translate-y-[0.45rem] rounded-md bg-black transition-all duration-300 peer-checked:rotate-45"
							></div>
						</div>
					</button>
				{/if}

				{#if otherOpen}
					<button
						class="col-start-1 row-start-1 flex cursor-pointer flex-col gap-1.5"
						transition:fade={{ duration: 300 }}
						onclick={() => closeOther(open)}
						title="メニュー"
					>
						<div class="flex h-10 w-9 cursor-pointer flex-col items-center justify-center">
							<i class="fa-solid fa-angle-left other-close-ico"></i>
						</div>
					</button>
				{/if}
			</div>
		</div>
		<!---->
		<!--PC用メニュー-->
		<nav class="hidden md:flex">
			<ul class="flex items-center gap-5 whitespace-nowrap transition">
				<li><a href="/" class="header-text ml-3 text-xs tracking-wider transition">ホーム</a></li>
				<li>
					<a href="/about" class="header-text ml-3 text-xs tracking-wider transition">桐朋祭とは</a>
				</li>
				<li>
					<a href="/visitor" class="header-text ml-3 text-xs tracking-wider transition"
						>来場者の皆様へ</a
					>
				</li>
				<li>
					<a href="/organizations" class="header-text ml-3 text-xs tracking-wider transition"
						>参加団体</a
					>
				</li>
				<li>
					<a href="/foods" class="header-text ml-3 text-xs tracking-wider transition">飲食情報</a>
				</li>
				<li>
					<a href="/timetable" class="header-text ml-3 text-xs tracking-wider transition"
						>企画タイムテーブル</a
					>
				</li>
				<li>
					<button
						class="header-text ml-3 cursor-pointer text-xs tracking-wider transition"
						onclick={() => (otherOpen = !otherOpen)}>その他</button
					>
				</li>
				<li>
					<a
						href="https://www.instagram.com/tohofes_2026/"
						class="header-text ml-3 text-xs tracking-wider transition"
						title="Instagram"
						target="_blank"
					>
						<i class="fa-brands fa-instagram"></i>
					</a>
				</li>
				<li class="mr-6">
					<a
						href="https://x.com/tohofes_2026"
						class="header-text ml-3 text-xs tracking-wider transition"
						title="X(旧Twitter)"
						target="_blank"
					>
						<i class="fa-brands fa-x-twitter"></i>
					</a>
				</li>
			</ul>
		</nav>
	</div>

	<!--スマホ用メニュー-->
	{#if !otherOpen && !isOtherClosing}
		<nav class="px-6 pt-6 pb-6 md:hidden">
			<ul class="flex flex-col gap-4 text-sm tracking-wide">
				<li><a href="/" class="header-text">ホーム</a></li>
				<li><a href="/about" class="header-text">桐朋祭とは</a></li>
				<li><a href="/visitor" class="header-text">来場者の皆様へ</a></li>
				<li><a href="/organizations" class="header-text">参加団体</a></li>
				<li><a href="foods" class="header-text">飲食情報</a></li>
				<li><a href="/timetable" class="header-text">企画タイムテーブル</a></li>
				<li>
					<button class="header-text" onclick={() => (otherOpen = !otherOpen)}>その他</button>
				</li>
			</ul>
			<hr class="main-hr" />
			<div class="flex gap-2 text-center" style="">
				<a
					href="https://www.instagram.com/tohofes_2026/"
					class="text-xl header-text"
					target="_blank"
					title="第75回桐朋祭実行委員会公式Instagram"><i class="fa-brands fa-instagram"></i></a
				>
				<a
					href="https://x.com/tohofes_2026"
					class="text-xl header-text"
					target="_blank"
					title="第75回桐朋祭実行委員会公式X(旧Twitter)"><i class="fa-brands fa-x-twitter"></i></a
				>
			</div>
		</nav>
	{/if}

	{#if otherOpen}
		<nav
			class="overflow-auto p-6"
			transition:fade={{ duration: 500 }}
			onoutrostart={() => (isOtherClosing = true)}
			onoutroend={() => {
				isOtherClosing = false;
				if (pendingOpen) {
					open = true;
					pendingOpen = false;
				}
			}}
		>
			<ul class="flex flex-col gap-4 text-sm tracking-wide">
				<li>
					<a href="/access" class="header-text"
						><i class="fa-solid fa-map mr-1 text-xs"></i>本校へのアクセス</a
					>
				</li>
				<li>
					<a href="/site/sitemap" class="header-text"
						><i class="fa-solid fa-sitemap mr-1 text-xs"></i>サイトマップ</a
					>
				</li>
				<li>
					<a href="/link" class="header-text"
						><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>SNSリンク</a
					>
				</li>
				<li>
					<a href="/news" class="header-text"
						><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>お知らせ</a
					>
				</li>
				<li>
					<a href="/site/info" class="header-text"
						><i class="fa-solid fa-circle-info mr-1 text-xs"></i>情報</a
					>
				</li>
				<li>
					<a href="/site/oss" class="header-text"
						><i class="fa-solid fa-rectangle-list mr-1 text-xs"></i>オープンソースライセンス</a
					>
				</li>
				<li>
					<a href="/site/saucecode" class="header-text"
						><i class="fa-solid fa-code mr-1 text-xs"></i>ソースコード</a
					>
				</li>
				<li>
					<a href="https://www.toho.ed.jp/" target="_blank" class="header-text"
						><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"
						></i>桐朋中学校・高等学校HP</a
					>
				</li>
				<li>
					<a href="https://fes.tcc-archive.club/2026/" target="_blank" class="header-text"
						><i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"
						></i>コンピューター部桐朋祭用特設HP</a
					>
				</li>
				<li>
					<a href="/site/contact" class="header-text"
						><i class="fa-solid fa-envelope mr-1 text-xs"></i>お問い合わせ</a
					>
				</li>
				<hr class="main-hr" />
				<button class="header-text" onclick={() => closeOther(open)}>
					<i class="fa-solid fa-angle-left mr-1 text-xs"></i>
					{#if open}メニューに戻る{/if}
					{#if !open}閉じる{/if}
				</button>
			</ul>
		</nav>
	{/if}
</header>

<!-- ページ内容 -->
{@render children()}

<!--フッター-->
<footer class="footer m-0 w-full">
	<div class="container">
		<!--s:PC表示用-->
		<div class="hidden md:flex">
			<div class="footer-top-content">
				<!-- フッターの左側コンテンツ -->
				<div class="footer-flex-content">
					<div class="footer-logo">
						<a href="/">
							<img src={data.logo_2} alt={data.logo_alt} class="h-auto w-45 rounded-xl" />
						</a>
					</div>
					<br />
					<a href="/access" class="footer-text"
						><i class="fa-solid fa-location-dot mr-1 text-xs"></i>{data.school_address}</a
					>
				</div>

				<!-- フッターの右側コンテンツ -->
				<div class="footer-flex-content">
					<h4>ご案内</h4>
					<ul>
						<li><a href="/about">桐朋祭について</a></li>
						<li><a href="/visitor">来場者の皆様へ</a></li>
						<li><a href="/access">本校へのアクセス</a></li>
						<li><a href="/timetable">企画タイムテーブル</a></li>
						<li><a href="/news">お知らせ</a></li>
						<li><a href="/site/info">サイト情報</a></li>
						<li><a href="/site/sitemap">サイトマップ</a></li>
						<li><a href="/site/contact">お問い合わせ</a></li>
					</ul>
				</div>
				<div class="footer-flex-content">
					<h4>参加団体</h4>
					<ul>
						{#if data.random && data.random.length > 0}
							{#each data.random as item}
								<li class="flex flex-col gap-2.5">
									<a href={getUrl(item)}>
										<span>{item.title}</span>
									</a>
								</li>
							{/each}
						{:else}
							<p class="text-white">参加団体の取得に失敗しました</p>
						{/if}
						<li class="flex flex-col gap-2.5">
							<a href="/organizations" class="font-bold">
								<i class="fa-solid fa-list"></i><span>一覧はこちら</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="footer-flex-content">
					<h4>各種SNS / リンク</h4>
					<ul>
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
							<a href="https://fes.tcc-archive.club/2026/" target="_blank">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>コンピューター部桐朋祭用特設HP</span>
							</a>
						</li>
						<li>
							<a href="/link">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>すべてのリンクを確認する</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--e:PC表示用-->
		<!---->
		<!--s:モバイル表示用-->
		<div class="flex w-full flex-col p-1 md:hidden">
			<!--s:ロゴ・住所-->
			<div class="flex flex-col items-center justify-center gap-4">
				<a href="/">
					<img src={data.logo_2} alt={data.logo_alt} class="mt-4 h-auto w-20 rounded-xl" />
				</a>
				<p class="text-white">
					<i class="fa-solid fa-location-dot mr-1 text-xs"></i>{data.school_address}
				</p>
			</div>
			<!--s:ロゴ・住所-->
			<!---->
			<!--s:アコーディオン-->
			<div class="mt-8">
				<details class="accordion-main mb-4 min-w-full">
					<summary class="font-bold">ご案内</summary>
					<ul class="pt-2 pl-2">
						<li><a href="/about">桐朋祭について</a></li>
						<li><a href="/visitor">来場者の皆様へ</a></li>
						<li><a href="/access">本校へのアクセス</a></li>
						<li><a href="/timetable">企画タイムテーブル</a></li>
						<li><a href="/news">お知らせ</a></li>
						<li><a href="/site/info">サイト情報</a></li>
						<li><a href="/site/sitemap">サイトマップ</a></li>
						<li><a href="/site/contact">お問い合わせ</a></li>
					</ul>
				</details>
				<details class="accordion-main mb-4 min-w-full">
					<summary class="font-bold">参加団体</summary>
					<ul class="pt-2 pl-2">
						{#if data.random && data.random.length > 0}
							{#each data.random as item}
								<li class="flex flex-col gap-2.5">
									<a href={getUrl(item)}>
										<span>{item.title}</span>
									</a>
								</li>
							{/each}
						{:else}
							<p class="text-white">参加団体の取得に失敗しました</p>
						{/if}
						<li class="flex flex-col gap-2.5">
							<a href="/organizations" class="font-bold">
								<i class="fa-solid fa-list"></i><span>一覧はこちら</span>
							</a>
						</li>
					</ul>
				</details>
				<details class="accordion-main min-w-full">
					<summary class="font-bold">各種SNS / リンク</summary>
					<ul class="pt-2 pl-2">
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
							<a href="https://fes.tcc-archive.club/2026/" target="_blank">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>コンピューター部桐朋祭用特設HP</span>
							</a>
						</li>
						<li>
							<a href="/link">
								<i class="fa-solid fa-arrow-up-right-from-square mr-1 text-xs"></i>
								<span>すべてのリンクを確認する</span>
							</a>
						</li>
					</ul>
				</details>
			</div>
			<!--e:アコーディオン-->
		</div>
		<!--e:モバイル表示用-->
		<!---->
		<!--s:フッター最下部-->
		<div class="footer-bottom-content mx-auto">
			<br />
			<hr class="sub-hr" />
			<br />
			<a href="/site/site-policy" class="footer-link" style="margin-right: 10px;">サイトポリシー</a
			><span class="footer-span">|</span>
			<a
				href="/site/privacy-policy"
				class="footer-link"
				style="margin-right: 10px; margin-left: 10px;">プライバシーポリシー</a
			><span class="footer-span">|</span>
			<a href="/site/contact" class="footer-link" style="margin-left: 10px;">お問い合わせ</a>
			<div class="flex mt-2">
				<p class="footer-text my-auto">
					&copy; 2026 TohoFes. 75th.tohofes.jp
				</p>
				<!--<span class="my-auto mx-2 text-white">|</span>-->
				<div class="ml-auto">
					<a
						href="https://github.com/TohoComputerClub/tohofes2026-web.git" target="_blank"
						class="bg-gray-300 p-0.5 rounded-sm text-xs tracking-wider transition" 
					>
						<i class="fa-brands fa-github"></i><kbd>Sauce</kbd>
					</a>
					<a
						href="https://gitlab.atserver186.jp/t-aoki186/tohofes2026-web.git" target="_blank"
						class="bg-gray-300 p-0.5 rounded-sm text-xs tracking-wider transition" 
					>
						<i class="fa-brands fa-gitlab"></i><kbd>Sauce</kbd>
					</a>
				</div>
			</div>
		</div>
		<!--e:フッター最下部-->
	</div>
</footer>

<style>
	.redirect-link-actions {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.redirect-link-actions {
			flex-direction: column;
		}

		.link-main {
			width: 100%;
		}
	}
</style>
