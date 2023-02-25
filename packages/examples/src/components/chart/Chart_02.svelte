<script>
	import Card from "@dusk-network/card";
	import Chart from "@dusk-network/chart";
	import { marketData } from "./data.js";

	const prices = JSON.parse(marketData).prices;

	function getData(data) {
		let marketCapData = {};
		marketCapData.title = undefined;
		marketCapData.xKey = "date";
		marketCapData.yKey = "price";
		marketCapData.groups = data.map((group) => {
			return {
				[marketCapData.xKey]: group[0],
				[marketCapData.yKey]: group[1],
			};
		});
		return marketCapData;
	}
</script>

<Card overflow="{true}">
	<div style="height: 150px">
		<Chart type="line" data="{getData(prices)}" />
	</div>
</Card>
