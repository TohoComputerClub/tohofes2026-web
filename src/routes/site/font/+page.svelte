<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	let pageTitle = 'フォントテスト';
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
		<div class="min-x-full mt-4">
			<p class="text-3xl font-thin">Thin 100:&nbsp;第75回桐朋祭&nbsp;The 75th Toho Festival</p>
            <p class="text-3xl font-normal">Regular 400:&nbsp;第75回桐朋祭&nbsp;The 75th Toho Festival</p>
            <p class="text-3xl font-bold">Bold 700:&nbsp;第75回桐朋祭&nbsp;The 75th Toho Festival</p>
            <p class="text-3xl font-extrabold">ExtraBold 800:&nbsp;第75回桐朋祭&nbsp;The 75th Toho Festival</p>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
