<script lang="ts">
	const { data } = $props();
	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';
	/*ローディング*/
	import { isVisible } from '$lib/stores/loader.js';
	import Modal from '$lib/components/Modal.svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
	import '@splidejs/svelte-splide/css';
	import { Pagination } from '@mantine/core';
	import './tp.css';

	/*s:モーダル*/
	let showModal = $state(false);
	let modalType = $state('');

	function openModal(type) {
		showModal = true;
		modalType = type;
	}
	/*e:モーダル*/
	/*s:Auto Scroll*/
	const optionsLeft = {
		type: 'loop',
		drag: 'free',
		focus: 'center',
		perPage: 3,
		gap: '2rem',
		padding: '5%',
		pagination: false,
		autoScroll: {
			speed: 2 // 右→左
		},
		breakpoints: {
			768: {
				perPage: 1,
				gap: '1rem'
			}
		}
	};
	const optionsRight = {
		type: 'loop',
		drag: 'free',
		focus: 'center',
		perPage: 3,
		gap: '2rem',
		padding: '5%',
		pagination: false,
		autoScroll: {
			speed: -2 // 左→右
		},
		breakpoints: {
			768: {
				perPage: 1,
				gap: '1rem'
			}
		}
	};
	/*e:Auto Scroll*/

	/*s:ローディングアニメーションをもう一度視聴する*/
	function replayAnimation() {
		isVisible.set(true);
	}
	/*e:ローディングアニメーションをもう一度視聴する*/

	/*===*/
	// video要素への参照を保持する変数（型を指定）
	let videoElement: HTMLVideoElement;

	onMount(() => {
		if (videoElement) {
			// 再生処理
			videoElement.play().catch((error) => {
				console.error('オートプレイがブロックされました:', error);
			});
		}
	});

	// 終了時のハンドラー（必要に応じて処理を追加）
	const handleEnded = () => {
		console.log('再生終了：最終フレームで停止中');
	};
</script>

<svelte:head>
	<title>{data.site_title}</title>
	<meta property="og:title" content={data.site_title} />
</svelte:head>

<Modal bind:showModal>
	<!--s:M.お困りの場合-->
	{#if modalType === 'a'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-circle-info mr-2"></i>お困りの場合
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">
			迷子を発見した場合、落とし物をした場合、その他お困りの際は、お気軽にお近くの桐朋祭スタッフまでお声がけください。
			<br />
			また、万が一不審者や不審物を見かけたら絶対に近づかず、速やかにお近くの桐朋祭スタッフにお知らせください。
		</p>
		<!--e:M.お困りの場合-->
		<!---->
		<!--s:M.お支払いについて-->
	{:else if modalType === 'b'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-money-check-dollar mr-2"></i>お支払いについて
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">
			今年度から、<span class="font-bold text-red-600"
				>生徒による飲食団体（屋台・喫茶）とジュース売り場は、交通系ICカード決済限定です。</span
			><br />
			現金やクレジットカード、PayPayなどの他決済サービスはご利用いただけませんのでご注意ください。
		</p>
		<p class="mt-1 leading-[1.8rem]">
			1階の食堂・パン売り場をご利用の場合は、食堂内の券売機または手売り食券売り場で、あらかじめ「食堂用食券」をお買い求めください。
			<br />
			<span class="font-bold text-red-600"
				>食堂用食券の購入は<span class="underline">現金のみ利用可能</span>です</span
			>（キャッシュレス決済はご利用いただけません）のでご了承ください。
		</p>
		<a href="/visitor/#payment" class="mt-2 text-(--main-text-color)"
			><i class="fa-solid fa-link mr-2 text-sm"></i>詳しくはこちらをご覧ください
		</a>
		<!--e:M.お支払いについて-->
		<!---->
		<!--s:M.災害が発生した場合-->
	{:else if modalType === 'c'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-circle-exclamation mr-2"></i>災害が発生した場合
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">
			<span class="font-bold">地震が発生した場合･･･</span>
			<br />
			<span class="font-bold text-red-600">まずはその場で身の安全を確保してください。</span
			>本校舎は耐震構造になっており、安全です。指示があるまでは校舎内に留まるようお願いします。
		</p>
		<p class="leading-[1.8rem]">
			<span class="font-bold">火災が発生した場合･･･</span>
			<br />
			<span class="font-bold text-red-600">火元には絶対に近づかず</span
			>、近くの桐朋祭スタッフへ通報してください。
			<br />
			災害の発生後、教職員による避難誘導が開始された場合は、落ち着いてその誘導に従ってください。避難場所は東グラウンドです。
		</p>
		<!--e:M.災害が発生した場合-->
		<!---->
		<!--s:M.校内でのお食事について-->
	{:else if modalType === 'd'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-utensils mr-2"></i>校内でのお食事について
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">
			お食事は、指定された場所（食堂、屋台スペースのテント、特別教室5・6、中学棟2階休憩所）以外ではご遠慮ください。
			<br />
			また、校内で出たゴミは、指定の場所に分別をして処分していただきますようお願いいたします。
			<br />
		</p>
		<a href="/visitor/#" class="mt-2 text-(--main-text-color)"
			><i class="fa-solid fa-link mr-2 text-sm"
			></i>詳しい場所につきましてはこちらの校内マップををご覧ください。
		</a>
		<!--e:M.校内でのお食事について-->
		<!---->
		<!--s:M.乳幼児をお連れのご来場者様へ-->
	{:else if modalType === 'e'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="tf26-icon-material icon-baby-bottle mr-2"></i>小さなお子様をお連れの方へ
		</p>
		<hr class="main-hr" />
		<p class="leading-[2.2rem]">
			小さなお子様をお連れの方で、授乳が必要な方は、総合案内所(1階)の桐朋祭スタッフまでお声がけください。
			<br />
			なお、1階のホール付近と食堂横中庭付近に、おむつ交換台つきの多目的トイレがございます。
			<br />
			<!--校内マップを追加する-->
		</p>
		<a href="/visitor/#payment" class="mt-2 text-(--main-text-color)"
			><i class="fa-solid fa-link mr-2 text-sm"
			></i>詳しい場所につきましてはこちらの校内マップををご覧ください。
		</a>
		<!--e:M.乳幼児をお連れのご来場者様へ-->
		<!---->
		<!--s:M.体調不良について-->
	{:else if modalType === 'f'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="tf26-icon-material icon-poor-health mr-2"></i>体調がすぐれない場合
		</p>
		<hr class="main-hr" />
		<p class="leading-[1.8rem]">
			体調がすぐれない場合、ご気分の悪い場合は、決して無理をなさらず、お近くの桐朋祭スタッフまでお声がけください。
			<br />
			保健室へお連れいたします。
		</p>
		<!--e:M.体調不良について-->
		<!---->
		<!--s: 飲食の決済方法について-->
	{:else if modalType === 'topp-important'}
		<p class="mb-4 text-center text-2xl font-bold text-(--main-text-color)">
			<i class="fa-solid fa-triangle-exclamation"></i>【重要】飲食の決済方法について
		</p>
		<hr class="main-hr" />
		<p class="mb-2 leading-[1.8rem]">
			今年度から、飲食の決済方法を大きく変更しています。<br />
			<span class="font-bold">食堂・パン売り場をご利用の場合</span>と、<span class="font-bold"
				>飲食団体（屋台・喫茶）やジュース売り場をご利用の場合</span
			>
			<br />
			で決済方法が以下の通り異なりますので、あらかじめご確認ください。
		</p>
		<img
			src="https://pic.atserver186.jp/img/tohofes/top-page/top-page-important-1_v3.webp"
			alt="「食堂・パン売り場」と「飲食団体（屋台・喫茶）」に関する支払い方法の案内。左側には食堂・パン売り場の説明があり、購入時には硬貨と千円札のみ利用できることが明記されている。左側には飲食団体の説明があり、交通系ICカード(モバイルSuica等を含む)のみが利用できることが明記されている。"
			class="w-full"
		/>
		<!--e: 飲食の決済方法について-->
	{/if}
</Modal>

<div class="tp-top-container">
	<div class="h-full w-full">
		<div class="tp-top-content">
			<video
				bind:this={videoElement}
				onended={handleEnded}
				muted
				playsinline
				preload="auto"
				class="tp-top-v md:my-auto"
			>
				<source
					src="https://pic.atserver186.jp/img/tohofes/top-page/top-video/top-v-pc.mp4"
					type="video/mp4"
					media="(min-width: 768px)"
				/>
				<source
					src="https://pic.atserver186.jp/img/tohofes/top-page/top-video/top-v-sp.mp4"
					type="video/mp4"
					class="block md:hidden"
				/>
				ご利用のブラウザは動画再生に対応していません。
			</video>
		</div>
	</div>

	<!--s:スクロールインジケーター-->
	<div class="absolute right-0 bottom-6 z-10 md:right-6">
		<div id="scroll-wrapper">
			<div id="scroll-wrapper-inner">
				<div id="scroll-title">Scroll</div>
				<div id="scroll-down"></div>
			</div>
		</div>
	</div>
	<!--e:スクロールインジケーター-->
</div>

<main>
	<!--s: 重要-->
	<div class="tp-info container mx-auto mt-10 rounded-xl p-4" data-aos="fade-up">
		<p class="mb-4 text-center text-xl font-bold md:text-2xl">
			第75回桐朋祭は終了いたしました！
		</p>
		<p class="text-bace mb-2 text-center md:text-lg">
			たくさんのご来場ありがとうございました！
		</p>
	</div>
	<!--e: 重要-->
	<!---->
	<!--s:お知らせ-->
	<div class="container mx-auto mt-10" data-aos="fade-up">
		<div class="main-link min-h-80">
			<div class="link-3 tp-news-list" style="margin: 0 5px 5px 5px; ">
				<p use:reveal class="news-section-title" style="padding: 0 0 10px 0;">
					{#each '・お知らせ'.split('') as char, i}
						<span class="char text-(--main-text-color)" style={`--d: ${i * 0.12}s`}>{char}</span>
					{/each}
				</p>
				<hr class="main-hr" />
				{#each data?.latestNews ?? [] as post}
					<li class="mx-auto mb-4 w-full list-none">
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
									<p class="truncate-title news-list-title ml-2 font-bold">{post.title}</p>
									<p class="truncate-heading news-list-heading mb-2">{post.heading}</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</a>
					</li>
				{/each}
			</div>
			<div class="link-4 tp-news-bg-icon flex items-center justify-center">
				<i
					class="tf26-icon-material icon-megaphone -scale-x-100 rotate-30 transform text-[12rem] text-(--main-text-color)"
				></i>
			</div>
		</div>
		<br />
		<a href="/news" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>お知らせ一覧へ</span>
			</div>
		</a>
	</div>
	<!--e:お知らせ-->
	<!---->
	<!--s:来場者の皆様へ-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title" style="view-transition-name: tfvisitortitle-hero;">
			{#each '来場者の皆様へ'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<div class="main-link" style="border: none !important;">
			<div class="link-2" style="padding: 0 !important;">
				<ul>
					<li class="mx-auto mb-4 w-full list-none">
						<button onclick={() => openModal('a')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-l-2 p-4"
								style="border-left-color: var(--main-text-color);"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="fa-solid fa-circle-info mr-2"></i>お困りの場合
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
						<button onclick={() => openModal('b')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-l-2 p-4"
								style="border-left-color: var(--main-text-color);"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="fa-solid fa-money-check-dollar mr-2"></i>お支払いについて
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
						<button onclick={() => openModal('c')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-l-2 p-4"
								style="border-left-color: var(--main-text-color);"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="fa-solid fa-circle-exclamation mr-2"></i>災害が発生した場合
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
					</li>
				</ul>
			</div>
			<div class="link-2" style="padding: 0 !important;">
				<ul>
					<li class="mx-auto mb-4 w-full list-none">
						<button onclick={() => openModal('d')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-r-2 p-4"
								style="border-right-color: var(--main-text-color); left: 0 !important; right: auto !important;"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="fa-solid fa-utensils mr-2"></i>校内でのお食事について
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
						<button onclick={() => openModal('e')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-r-2 p-4"
								style="border-right-color: var(--main-text-color);"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="tf26-icon-material icon-baby-bottle mr-2"></i>
										小さなお子様をお連れの方へ
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
						<button onclick={() => openModal('f')} class="w-full cursor-pointer">
							<div
								class="news-list flex border-r-2 p-4"
								style="border-right-color: var(--main-text-color);"
							>
								<div class="truncate-parent flex-col">
									<p class="truncate-title guid-title-text ml-2 font-bold text-(--main-text-color)">
										<i class="tf26-icon-material icon-poor-health mr-2"></i>体調がすぐれない場合
									</p>
								</div>
								<div class="news-list-icon my-auto ml-auto">
									<i class="fa-solid fa-angles-right left-auto mr-2"></i>
								</div>
							</div>
						</button>
					</li>
				</ul>
			</div>
		</div>
		<a href="/visitor" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>詳しくはこちら</span>
			</div>
		</a>
	</div>
	<!--e:来場者の皆様へ-->
	<!---->
	<!--s:企画情報-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title">
			{#each '企画情報'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<form class="s-search-form mb-4" action="/organizations/" method="GET">
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
		<div class="relative m-auto mt-10 mb-4 max-w-125 bg-white">
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
						<p>企画一覧を見る</p>
					</a>
				</div>
				<div class="tp-search-method">
					<a href="/timetable" class="dash-link">
						<i class="fa-solid fa-list"></i>
						<p>タイムテーブルから<br />探す</p>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="container mx-auto mt-4 mb-12">
		<a href="/organizations" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-magnifying-glass"></i>
				<span>参加団体一覧はこちら</span>
			</div>
		</a>
	</div>
	<!--e:企画情報-->
	<!---->
	<!--s:アクセス-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title">
			{#each 'アクセス'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<div class="main-link">
			<div class="link-2">
				<div class="map-text">
					<p class="my-auto text-xl text-(--main-text-color)">
						桐朋中学・高等学校<br />〒186-0004<br /><i class="fa-solid fa-location-dot mr-1 text-xs"
						></i>東京都国立市中3-1-10
					</p>
				</div>
				<hr class="main-hr" />
				<div class="map-text">
					<p class="my-auto text-xl text-(--main-text-color)">
						<i class="fa-solid fa-train mr-1 text-xs"></i>JR中央線&nbsp;国立駅より徒歩15分<br /><i
							class="fa-solid fa-train mr-1 text-xs"
						></i>JR南武線&nbsp;谷保駅より徒歩15分
					</p>
				</div>
			</div>
			<div class="link-2">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4746059148924!2d139.44237747639895!3d35.68993672949453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e3f60c18b89b%3A0xec006afe5f872d28!2z5qGQ5pyL5Lit5a2m5qCh44O75qGQ5pyL6auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1771772582613!5m2!1sja!2sjp"
					width="100%"
					height="450"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Google Map"
					class="rounded-lg"
					style="border:0;"
				></iframe>
			</div>
		</div>
		<br />
		<a href="/access" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>アクセスの詳細はこちら</span>
			</div>
		</a>
	</div>
	<!--e:アクセス-->
	<!---->
	<!--s:桐朋祭とは-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title">
			{#each '桐朋祭とは'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<div class="main-link">
			<div class="link-2 bg-white" style="padding: 0 !important; margin: 0 !important;">
				<img
					src="https://pic.atserver186.jp/img/tohofes/past_tohofes.webp"
					alt="桐朋祭画像"
					class="h-auto w-full rounded-lg"
				/>
			</div>
			<div class="link-2">
				<!--テーマ説明-->
				<p use:reveal class="split-text my-auto text-(--main-text-color)">
					桐朋祭は、毎年6月上旬に開催される、桐朋中学・高等学校の文化祭です。
					<br />
					例年1万人以上の方にご来場いただく本校最大のイベントであり、約1,700名の桐朋生ひとりひとりが最高の自己表現を――ときにやりすぎなほどに――披露する場でもあります。
				</p>
			</div>
		</div>
		<br />
		<a href="/about" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>詳しくはこちら</span>
			</div>
		</a>
	</div>
	<!--e:桐朋祭とは-->
	<!---->
	<!--s:テーマについて-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title">
			{#each 'テーマについて'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<div class="main-link">
			<div class="link-2">
				<!--テーマ説明-->
				<p use:reveal class="split-text my-auto text-(--main-text-color)">
					第75回桐朋祭実行委員会では、まずテーマで表現したい要素について「桐朋祭が盛り上がる様子」
					「細かいところまで気を配り完成していく様子」「すべてのものや人が活かされる様子」
					を重視することにしました。
				</p>
			</div>
			<div class="link-2">
				<img
					src="https://pic.atserver186.jp/img/tohofes/tf26-logo-m-v3.webp"
					alt="第75回桐朋祭ロゴ"
					class="m-auto ml-auto block h-auto w-[50%]"
					style="view-transition-name: tftheme-hero;"
				/>
			</div>
		</div>
		<br />
		<a href="/about/#theme" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>詳しくはこちら</span>
			</div>
		</a>
	</div>
	<!--e:テーマについて-->
	<!---->
	<!--s:講演者-->
	<div class="container m-auto mt-10 rounded-xl bg-(--title-bg-color)" data-aos="fade-up">
		<p use:reveal class="tf26-page-title">
			{#each '講演者'.split('') as char, i}
				<span class="char" style={`--d: ${i * 0.12}s`}>{char}</span>
			{/each}
		</p>
	</div>
	<div class="container mx-auto mt-4 mb-12" data-aos="fade-up">
		<div class="main-link">
			<div class="link-2" style="padding: 0 !important; margin: 0 !important;">
				<img
					src="https://pic.atserver186.jp/img/tohofes/guest/guest_v2.webp"
					alt="桐朋祭画像"
					class="m-auto ml-auto block h-auto w-[50%]"
				/>
			</div>
			<div class="link-2">
				<!--テーマ説明-->
				<p use:reveal class="split-text my-auto text-(--main-text-color)">
					今年の講演者は、「イモニイ」こと井本陽久(いもと はるひさ)氏です。
				</p>
			</div>
		</div>
		<br />
		<a href="/guest" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>詳しくはこちら</span>
			</div>
		</a>
	</div>
	<!--e:講演者-->
	<!---->
	<hr class="main-hr" />
	<!---->
	<div class="container m-auto my-10 flex">
		<!--s:アニメーションを再視聴-->
		<button onclick={replayAnimation} class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-circle-play"></i>
				<span>アニメーションをもう一度視聴する</span>
			</div>
		</button>
		<!--e:アニメーションを再視聴-->
		<!---->
		<!--s: クレジット-->
		<a href="/site/info/" class="link-main">
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>クレジット</span>
			</div>
		</a>
		<!--e: クレジット-->
	</div>
	<!---->
</main>

<style>
	.tp-top-container {
		position: relative;
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	.tp-top-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.1)),
			url('https://pic.atserver186.jp/img/tohofes/top-page/top-video/top-i-pc-v2.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		filter: blur(10px);
		z-index: -1;
		transform: scale(1.1);
	}

	.tp-top-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.tp-top-v {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}

	@media (max-width: 1280px) {
		.tp-top-content {
			width: 90%;
			margin-inline: auto;
			overflow: hidden;
		}

		.tp-top-v {
			object-fit: contain;
			border-radius: 24px;
			height: auto;
			width: 100%;

			background-color: white;
		}
	}
	@media (max-width: 768px) {
		.tp-top-content {
			width: auto;
			height: 100%;
		}

		.tp-top-v {
			object-fit: cover;
			height: 100%;
			border-radius: 0;
		}

		.tp-news-list {
			z-index: 3;
		}

		.tp-news-bg-icon {
			z-index: 2;
			position: absolute !important;
			display: flex;
			right: 55%;
			left: 45%;
			margin-top: 6rem;
		}

		.tp-news-bg-icon i {
			opacity: 0.5;
		}
	}
</style>
