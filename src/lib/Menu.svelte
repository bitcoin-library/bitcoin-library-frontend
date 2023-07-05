<script>
	import navicon from 'svelte-awesome/icons/navicon';
	import { Icon } from 'svelte-awesome';
</script>

<div class="dropdown dropdown-end">
	<label tabindex="0" class="btn-ghost btn-circle avatar btn">
		<button class="btn-circle btn">
			<Icon data={navicon} />
		</button>
	</label>
	<ul
		tabindex="0"
		class="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
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
