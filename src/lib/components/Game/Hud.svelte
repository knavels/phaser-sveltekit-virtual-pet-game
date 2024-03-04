<!-- Images.svelte -->
<script>
	import { handleInGameActions } from '$lib/phaser/scenes/GameScene';

	// Array of image URLs for demonstration
	// Replace these URLs with your actual image sources
	let buttons = [
		{ src: 'assets/images/apple.png', action: 'apple' },
		{ src: 'assets/images/candy.png', action: 'candy' },
		{ src: 'assets/images/rubber_duck.png', action: 'toy' },
		{ src: 'assets/images/rotate.png', action: 'rotate' }
	];
</script>

<div class="buttons">
	{#each buttons as button}
		<button on:click={() => handleInGameActions(button.action)}>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={button.src} alt="Image" class="clickable-image" />
		</button>
	{/each}
</div>

<style>
	.buttons {
		display: flex;
		justify-content: space-around; /* Adjust as needed */
		margin: 20px 0; /* Adjust as needed */
	}
	.clickable-image {
		width: 100px; /* Adjust as needed */
		height: 100px; /* Adjust as needed */
		transition: opacity 0.3s ease; /* Smooth transition for hover effect */
	}
	.clickable-image:hover {
		opacity: 0.5;
	}

	button {
		background-color: transparent; /* Make button background transparent */
		border: none; /* Remove default button border */
		padding: 0; /* Remove default padding */
		cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
		outline: none; /* Remove outline on focus for aesthetic reasons; consider accessibility implications */
	}
</style>
