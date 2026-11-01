<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import { Check } from 'drizzle-orm/gel-core';

	let pageTitle = 'プライバシーポリシー';
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
		<p class="mb-2">
			桐朋祭実行委員会（以下「当委員会」といいます）は、学園祭に関するお問い合わせのために送信されたメールに含まれる個人情報を、以下のとおり取り扱います。
		</p>
		<h1 class="text-xl font-bold">1.収集する個人情報</h1>
		<p>
			当委員会が公開するメールアドレス（toho2026program[at]gmail.com）宛てにお問い合わせいただく際、以下の個人情報を受信・保管することがあります。
		</p>
		<ul class="mb-4 list-inside list-disc">
			<li>送信元のメールアドレス</li>
			<li>メール本文に記載された内容</li>
			<li>お問い合わせ内容</li>
		</ul>
		<h1 class="text-xl font-bold">2.利用目的</h1>
		<p>ご提供いただいた個人情報は、以下の目的の範囲内で利用します。</p>
		<ul class="mb-4 list-inside list-disc">
			<li>お問い合わせへの返信・対応</li>
			<li>桐朋祭に関する連絡・確認</li>
			<li>必要に応じた事務的な記録</li>
		</ul>
		<h1 class="text-xl font-bold">3.第三者提供</h1>
		<p class="mb-2">
			法令に基づく場合や、ご本人の同意がある場合を除き、受信したメールの内容や個人情報を第三者に提供することはありません。
		</p>
		<h1 class="text-xl font-bold">4.管理方法</h1>
		<p class="mb-2">
			受信したメールは、不正アクセスや漏えいを防止するため、当委員会の責任ある担当者が厳重に管理します。
		</p>
		<h1 class="text-xl font-bold">5.注意事項</h1>
		<p class="mb-2">
			メールの送信はインターネット経由となるため、セキュリティを完全に保証することはできません。重要な個人情報を含む場合は、そのリスクを認識のうえご送信ください。
		</p>
		<h1 class="text-xl font-bold">6.お問い合わせ</h1>
		<p>
			本ポリシーに関するご質問は、下記メールアドレスまでご連絡ください。<br /><strong
				>toho2026program[at]gmail.com</strong
			>
		</p>
		<br />
		<p>制定日: 2026年06月05日</p>
		<p>桐朋祭実行委員会</p>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>
