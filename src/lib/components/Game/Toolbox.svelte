<!-- Images.svelte -->
<script lang="ts">
	import { handleInGameActions } from '$lib/phaser/scenes/GameScene';
	import { uiBlocked, selected } from '$stores';

	let buttons = [
		{ src: 'assets/images/apple.png', action: 'apple' },
		{ src: 'assets/images/candy.png', action: 'candy' },
		{ src: 'assets/images/rubber_duck.png', action: 'toy' },
		{ src: 'assets/images/rotate.png', action: 'rotate' }
	];
</script>

<div class="buttons">
	{#each buttons as button}
		<button on:click={() => handleInGameActions(button.action)} disabled={$uiBlocked}>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={button.src}
				alt="Image"
				class:clickable-image-selected={$selected === button.action}
				class:clickable-image={$selected !== button.action}
			/>
		</button>
	{/each}
</div>

<style>
	.buttons {
		display: flex;
		justify-content: space-around;
		margin: 20px 0;
	}

	.clickable-image {
		width: 100px;
		height: 100px;
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.clickable-image-selected {
		width: 100px;
		height: 100px;
		opacity: 0.5;
	}

	button:not(:disabled) .clickable-image:hover {
		opacity: 0.5;
	}

	button {
		background-color: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		outline: none;
	}

	button:disabled {
		cursor: not-allowed;
	}

	button:disabled .clickable-image {
		filter: grayscale(100%);
	}
</style>
