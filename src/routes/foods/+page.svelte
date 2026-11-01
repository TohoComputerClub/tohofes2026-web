<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	let pageTitle = '飲食情報';
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
		<h1 class="tf26-section-title mt-4" id="theme">食堂 / Cafeteria</h1>
		<img
			src="https://pic.atserver186.jp/img/tohofes/foods/menu/toho_lunch_menu.webp"
			alt="食堂のメニューの画像。カツカレーは650円、カルビクッパは600円、ソフトクリームは380円、串からあげは280円、アメリカンドッグは220円、牛丼は600円、タンメンは600円、ハリケーンポテトは280円、揚げもちは220円、フランクフルトは220円である。"
			loading="lazy"
			class="my-4 rounded-2xl"
		/>
		<hr class="main-hr" />
		<h1 class="tf26-section-title mt-4" id="theme">パン売り場 / Bakery</h1>
		<img
			src="https://pic.atserver186.jp/img/tohofes/foods/menu/bread_menu.webp"
			alt="焼き立てパンのメニュー一覧の画像。それぞれ220円。チョコチップメロンパン、ショコラデニッシュ、クリームデニッシュ、りんごカスタードデニッシュ、チーズデニッシュ棒がある。"
			loading="lazy"
			class="my-4 rounded-2xl"
		/>
		<hr class="main-hr" />
		<h1 class="tf26-section-title mt-4" id="theme">決済方法</h1>
		<p class="text-lg leading-[2.2rem]">
			今年度から、<span class="font-bold text-red-600"
				>生徒による飲食団体（屋台・喫茶）とジュース売り場は、交通系ICカード決済限定です。</span
			><br />
			現金やクレジットカード、PayPayなどの他決済サービスはご利用いただけませんのでご注意ください。
		</p>
		<p class="mt-1 text-lg leading-[2.2rem]">
			1階の食堂・パン売り場をご利用の場合は、食堂内の券売機または手売り食券売り場で、あらかじめ「食堂用食券」をお買い求めください。
			<br />
			<span class="font-bold text-red-600"
				>食堂用食券の購入は<span class="underline">現金のみ利用可能</span>です</span
			>（キャッシュレス決済はご利用いただけません）のでご了承ください。
		</p>
		<p class="mb-2 text-lg leading-[2.2rem]">
			<span class="font-bold">食堂・パン売り場をご利用の場合</span>と、<span class="font-bold"
				>飲食団体（屋台・喫茶）やジュース売り場をご利用の場合</span
			>
			で決済方法が以下の通り異なりますので、あらかじめご確認ください。
		</p>
		<img
			src="https://pic.atserver186.jp/img/tohofes/top-page/top-page-important-1_v3.webp"
			alt="「食堂・パン売り場」と「飲食団体（屋台・喫茶）」に関する支払い方法の案内。左側には食堂・パン売り場の説明があり、購入時には硬貨と千円札のみ利用できることが明記されている。左側には飲食団体の説明があり、交通系ICカード(モバイルSuica等を含む)のみが利用できることが明記されている。"
			class="payment-method-img"
		/>
		<hr class="main-hr" />
		<h1 class="tf26-section-title mt-4" id="theme">食堂・パン売り場 営業時間</h1>
		<p>※ 食堂のラストオーダーは閉店の30分前までです。</p>
		<p>※ パン売り場の営業は売り切れ次第終了となります。</p>
		<table class="food_time" summary="イベント日程表: 6月6日(土)から6月8日(月)までの開催時間">
			<thead>
				<tr>
					<th scope="col">日付 (曜日)</th>
					<th scope="col">開催時間</th>
				</tr>
			</thead>
			<tbody>
				<!-- 6/6 (土) 12:30 ~ 17:00 -->
				<tr class="sat-row">
					<td>6/6 <span class="day-number">(土)</span></td>
					<td>12:30 〜 17:00</td>
				</tr>
				<!-- 6/7 (日) 10:30 ~ 17:00 -->
				<tr class="sun-row">
					<td>6/7 <span class="day-number">(日)</span></td>
					<td>10:30 〜 17:00</td>
				</tr>
				<!-- 6/8 (月) 10:30 ~ 13:30 -->
				<tr class="mon-row">
					<td>6/8 <span class="day-number">(月)</span></td>
					<td>10:30 〜 13:30</td>
				</tr>
			</tbody>
		</table>
		<hr class="main-hr" />
		<h1 class="tf26-section-title mt-4" id="theme">飲食参加団体</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			飲食参加団体のメニューは以下のリンクからご確認いただけます。
		</p>
		<ul class="list-disc pl-5">
			<li>
				<a href="/organizations/food/ragucafe" target="_blank" class=" underline">ラグカフェ</a>
			</li>
			<li>
				<a href="/organizations/food/shiratama" target="_blank" class=" underline">しらたま</a>
			</li>
			<li>
				<a href="/organizations/food/morino_kasuteraya" target="_blank" class=" underline"
					>森のカステラ屋</a
				>
			</li>
			<li>
				<a href="/organizations/food/hawaiian_cafe" target="_blank" class=" underline"
					>ハワイアンカフェ アロハ・エ・コモ・マイ</a
				>
			</li>
			<li>
				<a href="/organizations/food/okutamanokafun" target="_blank" class=" underline"
					>奥多摩の花粉</a
				>
			</li>
			<li>
				<a href="/organizations/food/sutabar" target="_blank" class=" underline">スタBar</a>
			</li>
			<li>
				<a href="/organizations/food/eis_bahn" target="_blank" class=" underline">EIS BAHN</a>
			</li>
			<li>
				<a href="/organizations/food/dog_stand_82" target="_blank" class=" underline"
					>Dog Stand 82</a
				>
			</li>
		</ul>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	/* メインテーブル: モダンで読みやすいデザイン */
	.food_time {
		border-collapse: separate;
		border-spacing: 0;
		background: #ffffff;
		border-radius: 1.5rem;
		overflow: hidden;
		font-size: 1.1rem;
	}

	/* ヘッダースタイル */
	.food_time thead tr {
		color: #000000;
	}

	.food_time th {
		font-weight: 600;
		padding: 1rem 1.2rem;
		text-align: center;
		font-size: 1.2rem;
		letter-spacing: 1px;
		border-bottom: 2px solid #000000;
	}

	/* セル共通スタイル */
	.food_time td {
		padding: 1rem 1.2rem;
		text-align: center;
		border-bottom: 1px solid #ffffff;
		font-weight: 500;
	}

	/* 最終行のボーダーを消す */
	.food_time tbody tr:last-child td {
		border-bottom: none;
	}

	/* 時間カラム (2列目) スタイル */
	.food_time td:last-child,
	.food_time th:last-child {
		font-weight: 600;
		background-color: #ffffff;
		letter-spacing: 0.3px;
	}

	/* レスポンシブ対応: 小さい画面でも読みやすく */
	@media (max-width: 540px) {
		.food_time th,
		.food_time td {
			padding: 0.8rem 0.5rem;
			font-size: 0.9rem;
		}
		.food_time th {
			font-size: 1rem;
		}
		.food_time td:first-child,
		.food_time th:first-child {
			min-width: 100px;
		}
	}
</style>
