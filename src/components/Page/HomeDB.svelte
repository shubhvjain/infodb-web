<!-- this is the home page for a a selected LDB -->
<script>
	import Header from './Header.svelte';
	import SearchRecord from '../Actions/searchRecord.svelte';
	import { onMount } from 'svelte';
	export let db_name;
	let links = [];
	onMount(() => {
		links = [
			{
				type: 'link',
				title: 'Add new',
				icon: 'translate',
				link: `/${db_name}/new`
			},
      {
				type: 'link',
				title: 'Search',
				icon: 'translate',
				link: `/${db_name}/search`
			},
      {
				type: 'link',
				title: 'Settings',
				icon: 'translate',
				link: `/${db_name}/settings`
			}
		];
	});
</script>

<Header page="db-home" {db_name} />
<div class="row">
	{#each links as item}
		{#if item.type == 'link'}
			<div class="col-lg-2 col-xs-6">
				<div class="card">
					<div class="card-body text-center">
						<h5 class="card-title"></h5>
						<a href={item.link}>{item.title}</a>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>

<SearchRecord {db_name} />
