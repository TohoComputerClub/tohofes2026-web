<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { isVisible } from '#lib/stores/loader.js';

	//videoElementにHTMLVideoElement型を指定
	let videoElement: HTMLVideoElement;

	function handleClose() {
		isVisible.set(false);
	}

	onMount(() => {
		if (videoElement) {
			videoElement.play().catch((error: Error) => {
				console.error("再生ブロック:", error.name);
				//再生に失敗した場合ローディングを閉じる
				handleClose();
			});
		}

		const timer = setTimeout(() => {
			isVisible.set(false);
		}, 2000);

		return () => clearTimeout(timer);
	});
</script>

<div
	transition:fade={{ duration: 300 }}
	class="fixed inset-0 z-9999 flex items-center justify-center"
	style="background-color: #ffffff;"
	onclick={handleClose}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Escape' && handleClose()}
>
	<video
		bind:this={videoElement}
		src="https://pic.atserver186.jp/img/tohofes/loading-v/main-s.mp4"
		muted
		autoplay
		playsinline
		class="mx-auto my-auto h-64 w-auto rounded-2xl md:h-110"
		onended={handleClose}
	></video>
	<!---->
	<!--s:ローディングオーバーレイを閉じるボタン-->
	<button
		class="absolute top-6 right-6 cursor-pointer text-3xl font-bold text-black opacity-70 hover:opacity-100"
		onclick={(e) => {
			e.stopPropagation();
			handleClose();
		}}
		title="閉じる"
	>
		<i class="tf26-icon-material icon-x-mark-thin text-(--main-text-color)"></i>
	</button>
	<!--s:ローディングオーバーレイを閉じるボタン-->
</div>
