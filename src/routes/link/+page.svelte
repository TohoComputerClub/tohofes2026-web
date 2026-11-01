<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';

	let pageTitle = '各種SNSリンク';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-25 mr-1 ml-1 min-h-screen">
	<section class="container mx-auto mt-25 mb-25">
		<div
			class="mx-auto mt-8 flex max-w-117 flex-col items-center rounded-2xl bg-white px-8 py-8"
			style="box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);"
		>
			<!--
			<div class="profile-title">
				<img
					src="../img/ATSLink_light.png"
					alt="ATSLink"
					style="width:100px;max-width:90vw;height:auto;margin-bottom:8px;"
				/>
			</div>
			-->
			<img
				class="profile-avatar mb-2.5 h-auto w-27.5 rounded-full object-cover"
				style="border: 2px solid #e6e6e6;"
				src={data.logo}
				alt="アイコン"
			/>
			<h2 class="mb-2 text-[1.2rem] font-bold">第75回桐朋祭</h2>
			<div class="mb-4 flex w-full flex-col gap-4">
				<a class="profile-link-card" href="https://x.com/tohofes_2026" target="_blank">
					<i class="fa-brands fa-x-twitter text-xl"></i>
					X<br /><span>@tohofes_2026</span></a
				>
				<a class="profile-link-card" href="https://www.instagram.com/tohofes_2026/" target="_blank"
					><i class="fa-brands fa-instagram text-xl"></i>
					Instagram<br /><span>@tohofes_2026</span></a
				>
				<a
					class="profile-link-card"
					href="https://commina.atserver186.jp/tohofes_2026/"
					target="_blank"
					><i class="fa-solid fa-up-right-from-square text-xl"></i>
					Commina<br /><span>@tohofes_2026</span></a
				>
				<a class="profile-link-card" href="https://github.com/t-aoki186" target="_blank"
					><i class="fa-brands fa-github text-xl"></i>
					Github<br /><span>@t-aoki186</span></a
				>
				<a class="profile-link-card" href="https://www.toho.ed.jp/" target="_blank"
					><i class="fa-solid fa-up-right-from-square text-xl"></i>
					桐朋中学校・高等学校HP<br /><span></span></a
				>
				<a class="profile-link-card" href="https://2026.tcc-archive.club/" target="_blank"
					><i class="fa-solid fa-up-right-from-square text-xl"></i>
					コンピューター部桐朋祭用特設HP<br /><span></span></a
				>
				<!--
				<div
					style="display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:24px;"
				>
					<a href="https://atserver186.jp" target="_blank"
						><img
							src="../img/ATSLink_light.png"
							alt="ATSLink"
							style="width:70px;max-width:90vw;height:auto;margin-bottom:8px;"
						/></a
					><a
						href="https://link.atserver186.jp"
						style="font-size:0.8rem;color:black;text-decoration:none;margin-bottom:4px;"
						target="_blank">Created by link.atserver186.jp</a
					>
					<p style="font-size:0.8rem;margin:0;">©︎link.atserver186.jp All Rights Reserved</p>
				</div>
				-->
			</div>
		</div>
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	.profile-link-card {
		display: flex;
		align-items: center;
		background: #f7f7f7;
		border-radius: 12px;
		padding: 16px 20px;
		font-size: 1.1rem;
		color: #222;
		text-decoration: none;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		transition:
			background 0.2s,
			box-shadow 0.2s;
		gap: 16px;
	}

	.profile-link-card span {
		font-size: 0.95rem;
		color: #888;
		margin-left: 8px;
	}
	.profile-link-card:hover {
		background: #cecece;
		box-shadow: 0 2px 8px rgba(108, 99, 255, 0.08);
	}
</style>
