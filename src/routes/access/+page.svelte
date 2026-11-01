<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	let pageTitle = 'アクセス';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-15 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{pageTitle}</p>
	</div>
	<section class="container mx-auto mt-25 mb-25">
		<p class="my-auto mb-4 text-2xl text-(--main-text-color)">
			桐朋中学・高等学校<br />〒186-0004<br /><i class="fa-solid fa-location-dot mr-1 text-xs"
			></i>東京都国立市中3-1-10
		</p>
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4746059148924!2d139.44237747639895!3d35.68993672949453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e3f60c18b89b%3A0xec006afe5f872d28!2z5qGQ5pyL5Lit5a2m5qCh44O75qGQ5pyL6auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1771772582613!5m2!1sja!2sjp"
			width="100%"
			height="450"
			style="border:0;"
			class="mb-4 rounded-xl"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			title="Google Map"
		></iframe>
		<a
			href="https://www.google.com/maps?ll=35.689932,139.444952&z=16&t=m&hl=ja&gl=JP&mapclient=embed&cid=17005709833707924776"
			class="link-main" target="_blank"
		>
			<div class="link-main-underline">
				<i class="fa-solid fa-arrow-right-long"></i>
				<span>大きなマップで見る</span>
			</div>
		</a>
		<h1 class="tf26-section-title">路線図</h1>
		<ul class="mb-4">
			<li class="mt-4 mb-2 text-xl text-(--main-text-color)">
				<i class="fa-solid fa-square mr-2"></i>JR中央線 国立駅南口下車
			</li>
			<li>
				大学通りを南へ徒歩15分
				<br />立川バス/京王バス「矢川駅」方面行き5分バス停「桐朋」徒歩1分
			</li>
			<li class="mt-4 mb-2 text-xl text-(--main-text-color)">
				<i class="fa-solid fa-square mr-2"></i>JR南武線 谷保駅下車
			</li>
			<li>
				大学通りを北へ徒歩15分
				<br />
				立川バス「国立駅南口」方面行き5分バス停「桐朋」徒歩1分
			</li>
		</ul>
		<img
			src="https://www.toho.ed.jp/wp/wp-content/uploads/2023/12/accessmap.png"
			alt="桐朋中学・高等学校付近の路線図"
			style="max-width: 95%;"
			class="mb-4"
		/>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
