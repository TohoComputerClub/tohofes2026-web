<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal';

	let pageTitle = 'オープンソースライセンス';
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
		<div class="mb-4 rounded-2xl bg-gray-50 p-4">
			<p class="text-lg mb-4">使用しているオープンソースソフトウェアの一覧は、以下のリンクからご覧いただけます。</p>
			<a href="https://github.com/t-aoki186/tohofes2026-web/blob/main/oss.md" target="_blank" class="hover:underline">
				<i class="fa-solid fa-up-right-from-square mr-1 text-sm"></i>https://github.com/t-aoki186/tohofes2026-web/blob/main/oss.md
			</a>
			<p class="text-lg my-4">また、こちらのホームページのソースコードも、<a href="https://github.com/TohoComputerClub/" class="hover:underline">GitHub</a>と<a href="https://gitlab.atserver186.jp/t-aoki186/" class="hover:underline">GitLab</a>上でMITライセンスのもと公開されております。</p>
			<a href="/site/saucecode" class="hover:underline">
				<i class="fa-solid fa-folder mr-1 text-sm"></i>ソースコード
			</a>
			<span>|</span>
			<a href="https://opensource.org/license/mits" class="hover:underline" target="_blank">
				<i class="fa-solid fa-up-right-from-square mr-1 text-sm"></i>MIT LICENSE
			</a>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
