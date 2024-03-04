<script lang="ts">
	import Phaser from 'phaser';

	import { onMount } from 'svelte';
	import ToolBox from './Toolbox.svelte';
	import { config } from '$lib/phaser';
	import Hud from './Hud.svelte';

	let gameContainer: HTMLCanvasElement;

	onMount(async () => {
		config.canvas = gameContainer;
		const game = new Phaser.Game(config);
	});
</script>

<!-- Parent container with relative positioning -->
<div class="container">
	<div class="toolbox">
		<ToolBox />
	</div>

	<div class="hud">
		<Hud />
	</div>

	<!-- Canvas container -->
	<canvas bind:this={gameContainer} width={window.innerWidth} height={window.innerHeight} />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		user-select: none; /* Disable text selection */
	}

	.container .toolbox {
		position: absolute;
		z-index: 1;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for contrast */
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		padding: 0 10px; /* Padding for text */
		min-height: 30px; /* Minimum height */
		max-height: 120px; /* Maximum height, adjust as needed */
		bottom: 100px; /* 100px above the bottom */
		left: 50%; /* Start from the middle of the container */
		transform: translateX(-50%); /* Center it by moving it left by half of its width */
	}

	.container .hud {
		position: absolute;
		z-index: 1;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for contrast */
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		padding: 0 10px; /* Padding for text */
		min-height: 30px; /* Minimum height */
		max-height: 40px; /* Maximum height, adjust as needed */
	}
</style>
