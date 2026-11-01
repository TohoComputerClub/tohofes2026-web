<script>
	const { data } = $props();

	import { onMount } from 'svelte';
	import { reveal } from '#lib/reveal.js';
	import Modal from '#lib/components/Modal.svelte';

	let pageTitle = '来場者の皆様へ';
</script>

<svelte:head>
	<title>{pageTitle} | {data.site_title}</title>
	<meta property="og:title" content="{pageTitle} | {data.site_title}" />
</svelte:head>

<main class="mt-15 mr-1 ml-1 min-h-screen">
	<div class="container m-auto mt-25 border-b-2 border-b-(--main-text-color)">
		<p
			class="tf26-page-title"
			style="color: black; margin-bottom: 0; view-transition-name: tfvisitortitle-hero;"
		>
			{pageTitle}
		</p>
	</div>
	<section class="container mx-auto mt-15 mb-25">
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-bag-shopping mr-2"></i>持ち物について
		</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			校内は土足禁止ですので 、<span class="font-bold text-red-600 underline"
				>必ず上履きと靴袋をご持参ください</span
			>。
		</p>
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-circle-info mr-2"></i>お困りの場合
		</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			迷子を発見した場合、落とし物をした場合、その他お困りの際は、お気軽にお近くの桐朋祭スタッフまでお声がけください。
			<br />
			また、万が一不審者や不審物を見かけたら絶対に近づかず、速やかにお近くの桐朋祭スタッフにお知らせください。
			<br />
			<span class="underline">桐朋祭スタッフはこちらのデザインのTシャツを着用しております。</span>
		</p>
		<img
			src="https://pic.atserver186.jp/img/tohofes/visitor/t-shirt-design_v2.webp"
			alt="桐朋祭スタッフTシャツのデザイン"
			class="t-shirt-design-img"
		/>
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-money-check-dollar mr-2"></i>お支払いについて
		</h1>
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
		<!--e: お支払いについて-->
		<!---->
		<!--s: 災害が発生した場合-->
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-circle-exclamation mr-2"></i>災害が発生した場合
		</h1>
		<p class="text-lg leading-[2.2rem]">
			<span class="font-bold">地震が発生した場合･･･</span>
			<br />
			<span class="font-bold text-red-600">まずはその場で身の安全を確保してください。</span
			>本校舎は耐震構造になっており、安全です。指示があるまでは校舎内に留まるようお願いします。
		</p>
		<p class="mb-2 text-lg leading-[2.2rem]">
			<span class="font-bold">火災が発生した場合･･･</span>
			<br />
			<span class="font-bold text-red-600">火元には絶対に近づかず</span
			>、近くの桐朋祭スタッフへ通報してください。
			<br />
			災害の発生後、教職員による避難誘導が開始された場合は、落ち着いてその誘導に従ってください。避難場所は東グラウンドです。
		</p>
		<!--e: 災害が発生した場合-->
		<!---->
		<!--s: 校内でのお食事について-->
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-utensils mr-2"></i>校内でのお食事について
		</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			お食事は、指定された場所（食堂、屋台スペースのテント、特別教室5・6、中学棟2階休憩所）以外ではご遠慮ください。
			<br />
			また、校内で出たゴミは、指定の場所に分別をして処分していただきますようお願いいたします。
			<br />
			詳しくはパンフレットのP.9からの飲食情報をご確認ください。
		</p>
		<!--電子版パンフレットのリンクを張る-->
		<!--e: 校内でのお食事について-->
		<!---->
		<!--s: 小さなお子様をお連れの方へ-->
		<h1 class="visitor-p-section-title">
			<i class="tf26-icon-material icon-baby-bottle mr-2"></i>小さなお子様をお連れの方へ
		</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			小さなお子様をお連れの方で、授乳が必要な方は、総合案内所(1階)の桐朋祭スタッフまでお声がけください。
			<br />
			なお、1階のホール付近と食堂横中庭付近に、おむつ交換台つきの多目的トイレがございます。
			<br />
			詳しい場所はパンフレットのP.21のフロアマップをご参照ください。
			<br /><span class="text-sm"
				>(※電子版パンフレットは安全上の理由からフロアマップを非表示（または黒塗り）にしております。お手数ですが、詳細は紙のパンフレットにてご確認ください。)</span
			>
		</p>
		<!--e: 小さなお子様をお連れの方へ-->
		<!---->
		<!--s: 体調がすぐれない場合-->
		<h1 class="visitor-p-section-title">
			<i class="tf26-icon-material icon-poor-health mr-2"></i>体調がすぐれない場合
		</h1>
		<p class="mb-2 text-lg leading-[2.2rem]">
			体調がすぐれない場合、ご気分の悪い場合は、決して無理をなさらず、お近くの桐朋祭スタッフまでお声がけください。
			<br />
			保健室へお連れいたします。
		</p>
		<!--e: 体調がすぐれない場合-->
		<!---->
		<!--s: その他-->
		<h1 class="visitor-p-section-title">
			<i class="fa-solid fa-handshake mr-2"></i>その他
		</h1>
		<ul class="ml-4 text-lg leading-[2.2rem]">
			<li class="list-disc">
				校内での飲酒・喫煙は固くお断りします。<br
				/>飲酒・喫煙が発覚した場合、ご退場いただく場合がございます。
			</li>
			<li class="list-disc">
				校内の土足での通行はご遠慮ください。
				<br />
				上履きをお忘れになった方には、受付でスリッパをお貸しします。
			</li>
			<li class="list-disc">
				本校はエレベーターの数が少なくなっております。
				<br />
				エレベーターを必要とする方におゆずりいただき、可能な限り階段をご利用くださいますようお願いいたします。
			</li>
		</ul>
		<!--e: その他-->
	</section>
</main>
<ol class="main-breadcrumb container mx-auto">
	<li><a href="/">ホーム</a></li>
	<li>{pageTitle}</li>
</ol>

<style>
	.t-shirt-design-img {
		width: 25%;
	}

	.payment-method-img {
		width: 50%;
	}

	@media (max-width: 768px) {
		.t-shirt-design-img {
			width: 60%;
		}
		.payment-method-img {
			width: 80%;
			margin-inline: auto;
		}
	}

	@media (max-width: 480px) {
		.t-shirt-design-img {
			width: 100%;
		}
		.payment-method-img {
			width: 100%;
		}
	}

	.visitor-p-section-title {
		display: inline-block;
		font-size: 1.5rem;
		color: var(--main-text-color);
		padding: 0.5em 0;
		border-top: solid 3px var(--main-text-color);
		border-bottom: solid 3px var(--main-text-color);
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
