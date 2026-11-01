<script lang="ts">
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	let pageTitle = '桐朋祭とは';
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
		<div class="min-w-full">
			<img
				src="https://pic.atserver186.jp/img/tohofes/past_tohofes.webp"
				alt="桐朋祭画像"
				class="mb-4 h-[25vh] w-full rounded-lg object-cover"
			/>
			<h1 class="tf26-section-title">桐朋祭の概要</h1>
			<br />
			<p class="fade-up-o mb-2 text-lg leading-[2.2rem]">
				桐朋祭は、毎年6月上旬に開催される、桐朋中学・高等学校の文化祭です。
				例年1万人以上の方にご来場いただく本校最大のイベントであり、約1,700名の桐朋生ひとりひとりが最高の自己表現を――ときにやりすぎなほどに――披露する場でもあります。
			</p>
			<p class="fade-up-o mb-2 text-lg leading-[2.2rem]">
				<!---->
				桐朋祭に来場してまず目を引くのが、毎年デザインの異なる入場門！ デザインから制作まですべて生徒が担当しており、桐朋祭にやってきたワクワク感を演出します。
				校舎内に入れば、そこは工夫が凝らされた数々の参加団体が集まる楽園。 廊下を魚や電車が闊歩し、メイド喫茶ではかわいいメイド服を着た生徒たちがご主人様をお待ちしています。
				もちろん、滞在時間や参加団体を周る数に制限はナシ。開場から閉場までずっと居ても飽きないほどの充実度です！
			</p>
			<p class="fade-up-o mb-2 text-lg leading-[2.2rem]">
				<!---->
				初夏の明るい日差しに照らされたテラスでは、大迫力の「大垂れ幕」の下でステージイベントが開催中。
				体力派桐朋生、知識派桐朋生、キラキラのJKになった桐朋生(!?)など、個性豊かすぎる桐朋生をお楽しみいただけます。
				第2体育室で開催される、有志バンドによる熱気を帯びたライブも必見です！
			</p>
			<p class="fade-up-o mb-2 text-lg leading-[2.2rem]">
				<!---->
				校内を歩き回って小腹が空いてきたら、飲食団体へ足を運んでみましょう。 校舎内の各種喫茶店、屋外の屋台エリアなど、選択肢はとっても豊富。できたての一品に舌鼓を打ちながら、ほっと息をつくひとときを提供してくれます。
				<br />
				なお、今年度から飲食団体は完全キャッシュレスを導入。もう食券の列に並ぶ必要はありません！ (※交通系ICカードのみの対応ですので、あらかじめお手持ちのカード等へのチャージをお願いします。また、食堂・パン売り場は現金のみの対応です。)
			</p>
			<p class="fade-up-o text-lg leading-[2.2rem]">
				<!---->
				さて、そんな楽しい楽しい桐朋祭が今年度も開催されます！開催日時は、6/6(土) 12:00～17:00、6/7(日)
				9:30～17:00、6/8(月) 9:30～13:30 です。さあ、桐朋祭であなたも、桐朋生の"本気"を体感せよ！！！
			</p>
			<br />
			<hr class="main-hr" />
			<br />
			<h1 class="tf26-section-title">過去の様子</h1>
			<div class="flex flex-wrap justify-center gap-2">
				<article class="sp-search-result-card" style="border: none; margin: 0;">
					<img
						src="https://pic.atserver186.jp/img/tohofes/past_tohofes.webp"
						class="rounded-xl"
						alt="test"
					/>
				</article>
				<article class="sp-search-result-card" style="border: none; margin: 0;">
					<img
						src="https://pic.atserver186.jp/img/tohofes/about/past/tf25-1.webp"
						class="rounded-xl"
						alt="test"
					/>
				</article>
				<article class="sp-search-result-card" style="border: none; margin: 0;">
					<img
						src="https://pic.atserver186.jp/img/tohofes/about/past/tf25-2.webp"
						class="rounded-xl"
						alt="test"
					/>
				</article>
				<article class="sp-search-result-card" style="border: none; margin: 0;">
					<img
						src="https://pic.atserver186.jp/img/tohofes/about/past/tf25-3.webp"
						class="rounded-xl"
						alt="test"
					/>
				</article>
				<!--
				<article class="sp-search-result-card" style="border: none; margin: 0;">
					<img src="https://pic.atserver186.jp/img/tohofes/about/past/tf25-4.webp" class="rounded-xl" alt="test" />
				</article>
				-->
			</div>
			<br />
			<hr class="main-hr" />
			<br />
			<h1 class="tf26-section-title">テーマについて</h1>
			<br />
			<p class="fade-up-o mb-4 leading-[1.8rem]">
				第 75 回桐朋祭実行委員会では、まずテーマで表現したい要素について、「桐朋祭が盛り上がる様子」
				「細かいところまで気を配り完成していく様子」 「すべてのものや人が活かされる様子」
				を重視することにしました。
				<br />
				その上で話し合いを重ね、「桐朋生一人一人が個性を出しつつも、それが結束することで美しい調和と流れを伴った力を生み出す」という意味を込めた、<strong
					>「結う」</strong
				>という言葉をテーマに決定しました。
				<br />
				「結う」は英語の"You"ともかかっており、昨年度のテーマである「舞(my)」の桐朋祭からさらに進化し、お客様一人一人に重きを置いた「あなた(you)」の桐朋祭を作り上げようという目標も表しています。
				<br />
				ぜひ、<strong>「あなたの桐朋祭」</strong>を存分に楽しんでください！
			</p>
			<br />
			<hr class="main-hr" />
			<br />
			<h1 class="tf26-section-title">ロゴについて</h1>
			<img
				src="https://pic.atserver186.jp/img/tohofes/about/logo-main-v2.webp"
				alt="第75回桐朋祭ロゴ"
				class="m-auto mb-4 ml-auto h-auto w-[20%]"
				style="view-transition-name: tftheme-hero;"
			/>
			<br />
			<p class="fade-up-o mb-4 leading-[1.8rem]">
				ロゴ制作にあたっては、今回のテーマである「結う」の要素をストレートに取り込むことを意識しました。
				<br />
				いろどり豊かな2本の帯が重なり合うデザインとし、「あらゆる人と個性が互いに影響し合う」様子を表現しました。
			</p>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
</style>
