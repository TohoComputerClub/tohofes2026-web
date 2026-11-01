<script lang="ts">
	/*s: タイムテーブル(基)*/
	import type { TimetableEvent, ProcessedEvent } from '#lib/types/timetable.js';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	let { events = [] }: { events?: TimetableEvent[] } = $props();

	// 時間文字列を分に変換
	function timeToMinutes(timeStr: string): number {
		const [hours, minutes] = timeStr.split(':').map(Number);
		return hours * 60 + minutes;
	}

	// 時間範囲を解析
	function parseTimeRange(timeRange: string): { start: number; end: number } {
		const normalized = timeRange.replace(/\s+/g, '');
		const parts = normalized.includes('~') ? normalized.split('~') : normalized.split('-');
		const [startStr, endStr] = parts;
		return {
			start: timeToMinutes(startStr || '0:00'),
			end: timeToMinutes(endStr || '0:00')
		};
	}

	// イベントを処理
	function processEvents(): ProcessedEvent[] {
		if (!events || !Array.isArray(events)) {
			return [];
		}

		const processed: ProcessedEvent[] = [];

		events.forEach((event) => {
			if (!event || !event.schedule || !Array.isArray(event.schedule)) {
				return;
			}

			event.schedule.forEach((schedule) => {
				if (!schedule || !schedule.time) {
					return;
				}

				const { start, end } = parseTimeRange(schedule.time);
				processed.push({
					...event,
					startMinutes: start,
					endMinutes: end,
					duration: end - start,
					dayNumber: parseInt(schedule.day)
				});
			});
		});

		return processed.sort((a, b) => a.startMinutes - b.startMinutes);
	}

	// 開催場所の一覧を指定された順番で取得
	function getUniqueLocations(events: ProcessedEvent[]): string[] {
		const locationOrder = ['2階 テラス', '1階 第2体育室', '3･4階 関心ラウンジ'];
		const seenLocations: string[] = [];
		const locationSet = new Set<string>();

		events.forEach((event) => {
			if (event.location && !locationSet.has(event.location)) {
				locationSet.add(event.location);
				seenLocations.push(event.location);
			}
		});

		const orderedLocations = locationOrder.filter((location) => locationSet.has(location));
		seenLocations.forEach((location) => {
			if (!orderedLocations.includes(location)) {
				orderedLocations.push(location);
			}
		});

		return orderedLocations;
	}

	// 日付ごとにイベントをグループ化
	function groupByDay(events: ProcessedEvent[]): Map<number, ProcessedEvent[]> {
		const grouped = new Map<number, ProcessedEvent[]>();
		events.forEach((event) => {
			if (!grouped.has(event.dayNumber)) {
				grouped.set(event.dayNumber, []);
			}
			(grouped.get(event.dayNumber)!).push(event);
		});
		return grouped;
	}

	function buildEventMap(events: ProcessedEvent[]): Map<string, ProcessedEvent[]> {
		const map = new Map<string, ProcessedEvent[]>();
		events.forEach((event) => {
			const key = `${event.dayNumber}-${event.location || ''}`;
			if (!map.has(key)) {
				map.set(key, []);
			}
			(map.get(key)!).push(event);
		});
		return map;
	}

	// 【修正】タイムラインを固定（10:00〜17:00）
	const FIXED_TIME_RANGE = {
		min: 9.5 * 60, // 9:30 = 600分
		max: 17.5 * 60 // 17:30 = 1020分
	};

	// 分を時間表示に変換
	function formatTime(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
	}

	// 時間位置をパーセントで計算（固定レンジに対して）
	function getTimePosition(minutes: number): number {
		const position = (minutes - FIXED_TIME_RANGE.min) / (FIXED_TIME_RANGE.max - FIXED_TIME_RANGE.min) * 100;
		return Math.min(100, Math.max(0, position));
	}

	// イベントカードのスタイルを計算（Y軸の位置と高さ）
	function getEventStyle(event: ProcessedEvent): string {
		const topPercent = getTimePosition(event.startMinutes);
		const rawHeightPercent = event.duration / (FIXED_TIME_RANGE.max - FIXED_TIME_RANGE.min) * 100;
		const heightPercent = Math.max(4, Math.min(100 - topPercent, rawHeightPercent));
		return `top: ${topPercent}%; height: ${heightPercent}%; min-height: 40px;`;
	}

	// 時間グリッド線を生成（1時間ごと、10:00〜17:00）
	function getTimeGridLines(): number[] {
		const lines: number[] = [];
		for (let hour = 10; hour <= 17; hour++) {
			lines.push(hour * 60);
		}
		return lines;
	}

	let processedEvents = $derived(processEvents());
	let groupedByDay = $derived(groupByDay(processedEvents));
	let uniqueLocations = $derived(getUniqueLocations(processedEvents));
	let eventsByDayAndLocation = $derived(buildEventMap(processedEvents));

	// 表示する日（データから抽出）
	let availableDays = $derived(Array.from(groupedByDay.keys()).sort());

	// 固定の時間グリッド線
	let timeGridLines = $derived(getTimeGridLines());
	/*e: タイムテーブル(基)*/

	////

	/*s: 日付ラベルのマッピング*/
	const dayLabelMap: Record<number, string> = {
		1: '6/6 (Sat)',
		2: '6/7 (Sun)',
		3: '6/8 (Mon)'
	};

	function getDayLabel(day: number): string {
		return dayLabelMap[day] || `Day ${day}`;
	}
	/*e: 日付ラベルのマッピング*/

	/*s: 日付選択 */
	let selectedDay = $state(1);

	$effect(() => {
		const dateParam = Number(page.url.searchParams.get('date'));
		selectedDay = [1, 2, 3].includes(dateParam) ? dateParam : availableDays[0] || 1;
	});

	function setSelectedDay(day: number) {
		const searchParams = new URLSearchParams(page.url.searchParams.toString());
		searchParams.set('date', String(day));
		goto(`?${searchParams.toString()}`, { replace: true, reset: false });
	}
	//日付選択ボタンの表示用設定
	const dayButtons: { day: number; label: string }[] = [
		{ day: 1, label: '6/6 (Sat)' },
		{ day: 2, label: '6/7 (Sun)' },
		{ day: 3, label: '6/8 (Mon)' }
	];
	/*e: 日付選択*/

	/*s: イベントカードのリンク生成*/
	function getEventLink(event: ProcessedEvent): string {
		const category = event.category || 'unknown';
		const id = event.id || '';

		if (category && id) {
			return `/organizations/${encodeURIComponent(category)}/${encodeURIComponent(id)}`;
		}
		return '';
	}
	/*e: イベントカードのリンク生成*/
</script>

<!--s: タイムテーブル全体-->
<div class="timetable-container">
	<!--
	<div class="mb-4 block rounded-lg bg-(--main-text-color) p-4 md:hidden">
		<p class="text-lg text-white">
			現在、タイムテーブルは<span class="font-bold">パソコン（PC）版のみ</span
			>の対応となっております。
			<br />
			スマートフォンへの対応につきましては、現在急ぎ準備を進めております。
			<br />
			対応完了まで今しばらくお待ちいただけますようお願い申し上げます。
			<br /><br />
			もしスマートフォンで閲覧したい場合は、ブラウザの<span class="font-bold">「PC版サイトを見る」</span>機能をお試しください。
		</p>
	</div>
	-->
	<!--s: 日付選択ボタン-->

	<!--s: 日付選択ボタン-->
	<!---->

	{#if availableDays.includes(selectedDay)}
		{@const day = selectedDay}
		{@const dayEvents = groupedByDay.get(day) || []}
		<div class="timetable-day">
			<h2 class="day-title">{getDayLabel(day)}</h2>
			{#if dayEvents.length === 0}
				<p class="no-events">この日のイベントはありません</p>
			{:else}
				<div class="matrix-timetable">
					<!--s: タイムテーブルヘッダー(場所等の表示)-->
					<div class="matrix-header">
						<div class="time-column-header">時間</div>
						{#each uniqueLocations as location}
							<div class="location-header">
								<!-- 条件に応じて追加バッジを表示 -->
								{#if location === '2階 テラス'}
									<span class="location-badge stage">ステージ企画</span>
								{:else if location === '1階 第2体育室'}
									<span class="location-badge band">バンド</span>
								{:else if location === '3･4階 関心ラウンジ'}
									<span class="location-badge lounge">生徒による授業</span>
								{/if}
								<p class="text-normal"><i class="fa-solid fa-location-dot"></i>{location}</p>
							</div>
						{/each}
					</div>
					<!--e: タイムテーブルヘッダー(場所等の表示)-->
					<!---->
					<!--s: -->
					<div class="matrix-body">
						<!-- 時間軸（Y軸） -->
						<div class="time-axis">
							{#each timeGridLines as timeMinutes}
								<div class="time-label" style="top: {getTimePosition(timeMinutes)}%">
									{formatTime(timeMinutes)}
								</div>
							{/each}
						</div>

						<!--s: カテゴリ別列-->
						<div class="locations-container">
							{#each uniqueLocations as location}
								{@const locationEvents = eventsByDayAndLocation.get(`${day}-${location}`) || []}
								<div class="location-column">
									<div class="grid-lines">
										{#each timeGridLines as timeMinutes}
											<div class="grid-line" style="top: {getTimePosition(timeMinutes)}%"></div>
										{/each}
									</div>
									<!--s: eventカード-->
									{#each locationEvents as event (event.id + location + event.startMinutes)}
										{@const eventLink = getEventLink(event)}
										{#if eventLink}
											<a href={eventLink} class="event-card-link">
												<div
													class="event-card {event.location === '2階 テラス'
														? 'card-stage'
														: event.location === '1階 第2体育室'
															? 'card-band'
															: 'card-lounge'}"
													style={getEventStyle(event)}
												>
													<div class="event-time">
														{formatTime(event.startMinutes)} - {formatTime(event.endMinutes)}
														<span class="event-duration">（{event.duration}分）</span>
													</div>
													<h3 class="event-title">{event.title}</h3>
												</div>
											</a>
										{/if}
									{/each}
									<!--e: eventカード-->
								</div>
							{/each}
						</div>
						<!--e: カテゴリ別列-->
					</div>
					<!--e: -->
				</div>
			{/if}
		</div>
	{/if}
</div>

<!--e: タイムテーブル全体-->

<style>
	.timetable-container {
		margin: 0 auto;
		overflow-x: auto;
		width: 100%;
	}

	.timetable-day {
		margin-bottom: 48px;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.day-title {
		color: black;
		margin: 0;
		padding: 16px 24px;
		font-size: 1.5rem;
		background-color: white;
	}

	.no-events {
		padding: 40px;
		text-align: center;
		color: #999;
	}

	.matrix-timetable {
		display: flex;
		flex-direction: column;
		min-width: 800px;
	}

	/* ヘッダー行 */
	.matrix-header {
		display: flex;
		background: #f8f9fa;
		border-bottom: 2px solid #e0e0e0;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.time-column-header {
		width: 80px;
		flex-shrink: 0;
		padding: 12px 8px;
		font-weight: 600;
		font-size: 1.2rem;
		text-align: center;
		background: #f8f9fa;
		border-right: 1px solid #e0e0e0;
	}

	.location-header {
		flex: 1;
		padding: 12px 8px;
		font-weight: 600;
		text-align: center;
		background: #f8f9fa;
		border-right: 1px solid #e0e0e0;
		font-size: 0.9rem;
		word-break: break-word;
	}

	.location-header:last-child {
		border-right: none;
	}

	.location-badge {
		display: inline-block;
		font-size: 1.2rem;
		padding: 2px 6px;
		border-radius: 4px;
		margin-bottom: 8px;
		font-weight: 500;
	}

	.location-badge.stage {
		background: #fce6f0;
		color: #000000;
		border: 1px solid #ff6b6b40;
	}

	.location-badge.band {
		background: #ecf5fb;
		color: #000000;
		border: 1px solid #4ecdc440;
	}
	.location-badge.lounge {
		background: #ebf6f1;
		color: #000000;
		border: 1px solid #4ecdc440;
	}

	/* 本体（Y軸 + 場所列） */
	.matrix-body {
		display: flex;
		position: relative;
		min-height: 1500px;
	}

	/* 時間軸（Y軸） */
	.time-axis {
		width: 80px;
		flex-shrink: 0;
		position: relative;
		background: #fafbfc;
		border-right: 1px solid #e0e0e0;
	}

	.time-label {
		position: absolute;
		transform: translateY(-50%);
		right: 8px;
		font-size: 1.2rem;
		color: #666;
		font-family: monospace;
		white-space: nowrap;
	}

	/* 場所列コンテナ */
	.locations-container {
		flex: 1;
		display: flex;
		overflow-x: auto; /* ← visible から auto に変更！ */
		/* 横スクロールを有効にするために必要 */
	}

	.location-column {
		flex: 1;
		position: relative;
		min-width: 200px;
		border-right: 1px solid #e8e8e8;
		background: white;
	}

	.location-column:last-child {
		border-right: none;
	}

	/* グリッド線コンテナ */
	.grid-lines {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.grid-line {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: #e5e7eb;
		transform: translateY(-50%);
	}

	/* イベントカード */
	.event-card {
		position: absolute;
		left: 6px;
		right: 6px;
		border-radius: 3px;
		padding: 8px 10px;
		transition: all 0.2s ease;
		z-index: 10;
		border: 2px solid white;
	}

	/* 場所ごとの個別スタイル */
	.event-card.card-stage {
		background-color: #fce6f0;
		border-left: 4px solid #b64c6f;
	}

	.event-card.card-band {
		background-color: #ecf5fb;
		border-left: 4px solid #52aed8;
		display: flex;
	}

	.event-card.card-lounge {
		background-color: #ebf6f1;
		border-left: 4px solid #35a17a;
	}

	.event-card.card-stage:hover,
	.event-card.card-band:hover,
	.event-card.card-lounge:hover {
		transform: scale(1.01);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.event-time {
		font-size: 0.8rem;
		color: var(--main-text-color);
		font-weight: 600;
		font-family: monospace;
	}

	.event-duration {
		font-size: 0.7rem;
		color: #999;
	}

	.event-title {
		font-size: 1rem;
		font-weight: 600;
		margin: 4px 0;
		color: #333;
		line-height: 1.3;
	}

	@media (max-width: 768px) {
		.event-time {
			font-size: 0.7rem;
			color: var(--main-text-color);
			font-weight: 600;
			font-family: monospace;
		}

		.event-title {
			font-size: 0.8rem;
			font-weight: 600;
			margin: 4px 0;
			color: #333;
			line-height: 1.3;
		}
	}

	/*
	@media (max-width: 768px) {
		.timetable-container {
			padding: 10px;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
		.matrix-timetable {
			min-width: 700px;
			width: 100%;
		}

		.time-column-header,
		.time-axis {
			width: 60px;
			flex-shrink: 0;
		}

		.location-header {
			min-width: 180px;
			flex-shrink: 0; 
		}

		.location-column {
			min-width: 180px;
			flex-shrink: 0;
		}
		.locations-container {
			overflow-x: auto;
		}
	}
		*/

	/* デスクトップでは通常表示 */
	@media (min-width: 769px) {
		.matrix-timetable {
			min-width: auto;
		}

		.location-column {
			flex: 1;
			min-width: 200px;
		}

		/* デスクトップでは横スクロールを無効に */
		.locations-container {
			overflow-x: visible;
		}
	}
</style>
