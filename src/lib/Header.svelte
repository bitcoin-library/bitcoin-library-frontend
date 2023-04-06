<script>
    import { openSidebar } from "$lib/stores";
		import SearchHeader from "./Search/SearchHeader.svelte";

</script>

<div class="sticky top-0 z-50 navbar flex-row justify-between">
	<a href="/" class="btn btn-ghost normal-case text-xl">Bitcoin-Library</a>
  <SearchHeader />
	<div class="flex-none gap-2">
        <button on:click={() => $openSidebar = !$openSidebar}>Open Sidebar</button>
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="https://placeimg.com/80/80/people" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<a class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>