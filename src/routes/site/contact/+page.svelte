<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import { Check } from 'drizzle-orm/gel-core';

	let pageTitle = 'お問い合わせ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p class="tf26-page-title" style="color: black; margin-bottom: 0;">{pageTitle}</p>
	</div>
	<section class="container mx-auto mt-15 mb-25 flex flex-col">
		<div class="mb-4 rounded-2xl text-center bg-gray-50 p-4">
			<p class="text-lg mb-4">以下のメールアドレスにお問い合わせください。</p>
			<p class="text-2xl">toho2026program[at]gmail.com</p>
			<p>[at]は@に置き換えてください。</p>
		</div>
		<!--
		<div class="mx-auto w-full rounded-2xl bg-gray-50 p-10 md:w-[70%] lg:w-[50%]">
			<form class="flex flex-col">
				<label class="mb-4">
					<div class="mb-1 flex items-end justify-between">
						<span class="text-xl">お名前</span>
						<span class="text-lg font-normal text-gray-500">(例: &nbsp;桐朋&nbsp;太郎)</span>
					</div>
					<input type="text" class="w-full rounded-3xl outline-none appearance-none" />
				</label>
				<label class="mb-4">
					<div class="mb-1 flex items-end justify-between">
						<span class="text-xl">メールアドレス</span>
						<span class="text-lg font-normal text-gray-500">(例: &nbsp;hogehoge@example.com)</span>
					</div>
					<input type="text" class="w-full rounded-3xl outline-none appearance-none" />
				</label>
				<label>
					<div class="mb-1">
						<span class="text-xl">お問い合わせ内容</span>
					</div>
					<textarea class="min-h-[20vh] w-full appearance-none rounded-3xl outline-none"></textarea>
				</label>
				<div class="my-8">
					<input type="checkbox" class="mr-2 cursor-pointer" /><a
						href="/site/privacy"
						class="appearance-none underline outline-none">当サイトのプライバシーポリシー</a
					>に同意する
				</div>
				<button
					type="submit"
					class="w-full cursor-pointer rounded-3xl border border-black bg-white p-2 text-xl"
					>送信</button
				>
			</form>
		</div>
		-->
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
