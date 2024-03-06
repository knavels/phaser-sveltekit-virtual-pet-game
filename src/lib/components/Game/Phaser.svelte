<script lang="ts">
	import Phaser from 'phaser';

	import { onDestroy, onMount } from 'svelte';
	import ToolBox from './Toolbox.svelte';
	import { config } from '$lib/phaser';
	import Hud from './Hud.svelte';
	import { state } from '$stores/game';

	let gameContainer: HTMLCanvasElement;

	let game: Phaser.Game;

	onMount(async () => {
		config.canvas = gameContainer;
		game = new Phaser.Game(config);
	});

	onDestroy(async () => {
		game.destroy(false, false);
	});
</script>

<!-- Parent container with relative positioning -->
<div class="container">
	{#if $state === 'home'}
		<div class="message">
			<h2>😁 VIRTUAL PET</h2>
		</div>
	{:else if $state === 'game-over'}
		<div class="message">
			<h2>❌ GAME OVER ❌</h2>
		</div>
	{:else}
		<div class="toolbox">
			<ToolBox />
		</div>

		<div class="hud">
			<Hud />
		</div>
	{/if}

	<!-- Canvas container -->
	<canvas bind:this={gameContainer} width={window.innerWidth} height={window.innerHeight} />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		max-width: 360px;
		max-height: 640px;
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
		bottom: 50px; /* 100px above the bottom */
		left: 50%; /* Start from the middle of the container */
		transform: translateX(-50%); /* Center it by moving it left by half of its width */
	}

	.container .hud {
		position: absolute;
		width: 100%;
		z-index: 1;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for contrast */
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		min-height: 30px; /* Minimum height */
		max-height: 40px; /* Maximum height, adjust as needed */
	}

	.container .message {
		position: absolute;
		width: 100%;
		z-index: 1;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for contrast */
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		top: 50%; /* Center vertically */
		left: 50%; /* Center horizontally */
		transform: translate(
			-50%,
			-50%
		); /* Adjust the position to truly center based on its own size */
	}
</style>
