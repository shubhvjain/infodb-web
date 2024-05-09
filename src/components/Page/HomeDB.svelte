<!-- this is the home page for a a selected LDB -->
<script>
	import Header from './Header.svelte';
	import SearchRecord from '../Actions/searchRecord.svelte';
	import ShowIcon from '../Actions/showIcon.svelte';
	import { onMount } from 'svelte';
	export let db_name;
	let links = [];

	const showStats = ()=>{}
	const sync = ()=>{}
	onMount(() => {
		links = [
			{
				type: 'link',
				title: 'Add new',
				icon: 'plus',
				link: `/${db_name}/new`
			},
      {
				type: 'link',
				title: 'Search',
				icon: 'glass',
				link: `/${db_name}/search`
			},
      {
				type: 'link',
				title: 'Settings',
				icon: 'tool',
				link: `/${db_name}/settings`
			},
			{
				type: 'action',
				title: 'Stats',
				icon: 'bar',
				action: showStats
			},
			{
				type: 'action',
				title: 'Sync',
				icon: 'sync',
				action: sync
			}
		];
	});
</script>

<Header page="db-home" {db_name} />
<div class="row">
	{#each links as item}
	<div class="col-lg-2 col-xs-6">
		{#if item.type == 'link'}
				<div class="card p-0 m-0">
					<div class="card-body text-center m-1 p-1">
						<h5 class="card-title"> <ShowIcon name={item.icon} size="25"/> </h5>
						<a class="btn btn-sm btn-link" href={item.link}>{item.title}</a>
					</div>
				</div>
		{/if}
		{#if item.type == 'action'}
				<div class="card p-0 m-0">
					<div class="card-body text-center m-1 p-1">
						<h5 class="card-title"> <ShowIcon name={item.icon} size="25"/> </h5>
						<button class="btn btn-sm btn-link" on:click={item.action}> {item.title}</button>
						<!-- <a href={item.link}>{item.title}</a> -->
					</div>
				</div>
		{/if}
	</div>
	{/each}
</div>

<!-- <SearchRecord {db_name} /> -->
