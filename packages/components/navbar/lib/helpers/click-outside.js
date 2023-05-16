export let enabled = false;

export function clickOutside(node) {
	function handleClick(e) {
		if (node.className == e.target.className) return;
		if (!node.contains(e.target)) {
			node.dispatchEvent(new CustomEvent("outside"));
		}
	}

	return {
		update(enabled) {
			enabled && window.addEventListener("click", handleClick);
		},
		destroy() {
			window.removeEventListener("click", handleClick);
		},
	};
}
