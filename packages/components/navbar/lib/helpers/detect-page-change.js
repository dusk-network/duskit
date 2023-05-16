export function detectPageChange(onPageChange) {
	const observer = new MutationObserver(() => {
		onPageChange();
	});

	observer.observe(document.querySelector("head"), {
		childList: true,
		subtree: true,
	});
}
