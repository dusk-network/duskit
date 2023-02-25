import { getContext } from "svelte";
import { key } from "./key.js";

export function getTable() {
	const { data, columns, pageNumber, globalFilters, localFilters } = getContext(key);

	const table = {
		// init: () => {
		// table.getColumns();
		// table.resize();
		// table.addEventScrollX();
		// new ResizeObserver((mutations) => {
		//   table.resize();
		// }).observe(document.querySelector(`#${id.get()}`).parentElement);
		// },
		reset: () => {
			pageNumber.update((store) => (store = 1)); // eslint-disable-line
			globalFilters.remove();
			localFilters.remove();
			columns.set([]);
		},
		setRows: (arr) => {
			arr.forEach((item) => {
				Object.keys(item).forEach((k) => {
					if (item[k] === null) {
						item[k] = "";
					}
				});
			});
			data.set(arr);
			return;
		},
		// getSize: () => {
		//   const parent = document.querySelector(`#${id.get()}`).parentNode;
		//   const style = getComputedStyle(parent);
		//   const rect = parent.getBoundingClientRect();
		//   const getNumber = (pxValue) => {
		//     return parseFloat(pxValue.replace("px", ""));
		//   };
		//   return {
		//     parentWidth: rect.width,
		//     parentHeight: rect.height,
		//     width:
		//       (rect.width -
		//         getNumber(style.paddingLeft) -
		//         getNumber(style.paddingRight) -
		//         getNumber(style.borderLeftWidth) -
		//         getNumber(style.borderRightWidth)) /
		//       rect.width,
		//     height:
		//       (rect.height -
		//         getNumber(style.paddingTop) -
		//         getNumber(style.paddingBottom) -
		//         getNumber(style.borderTopWidth) -
		//         getNumber(style.borderBottomWidth)) /
		//       rect.height,
		//     top: style.paddingTop,
		//     right: style.paddingRight,
		//     bottom: style.paddingBottom,
		//     left: style.paddingLeft,
		//   };
		// },
		// resize: () => {
		//   if (!document.querySelector(`#${id.get()}`)) return;
		//   const size = table.getSize();
		//   const tableContainer = document.querySelector(`#${id.get()} .duk-table__table`);
		//   if (options.get().scrollY) {
		//     tableContainer.style.height =
		//       table.getTableContainerHeight(size.parentHeight * size.height) + "px";
		//     columns.redraw();
		//   }
		//   tableWidth.set(size.parentWidth * size.width);
		//   if (
		//     size.parentWidth * size.width <
		//     document.querySelector(`#${id.get()} table`).offsetWidth
		//   ) {
		//     tableContainer.style.overflowX = "auto";
		//   }
		// },
		// getTableContainerHeight: (height) => {
		//   let paginationBlock;
		//   if (
		//     options.get().pagination &&
		//     (options.get().blocks.paginationButtons || options.get().blocks.paginationRowCount)
		//   ) {
		//     paginationBlock = true;
		//   }
		//   const calc = [
		//     options.get().blocks.searchInput
		//       ? document.querySelector(`#${id.get()} .dt-search`).getBoundingClientRect().height
		//       : 0,
		//     paginationBlock
		//       ? document.querySelector(`#${id.get()} .dt-pagination`).getBoundingClientRect().height
		//       : 0,
		//   ];
		//   const sum = (a, b) => a + b;
		//   document.querySelector(`#${id.get()} .dt-table`).style.height =
		//     height - calc.reduce(sum) + "px";
		// },
		// addEventScrollX: () => {
		//   if (options.get().scrollY) {
		//     document.querySelector(`#${id.get()} .dt-table`).addEventListener("scroll", (e) => {
		//       document.querySelector(`#${id.get()} .dt-header`).style.left =
		//         -1 * e.target.scrollLeft + "px";
		//     });
		//   }
		// },
		// getColumns: () => {
		//   setTimeout(() => {
		//     const columnList = [];
		//     let i = 0;
		//     console.log(`#${id.get()} table thead th`);
		//     document.querySelectorAll(`#${id.get()} table thead th`).forEach((th) => {
		//       console.log(th);
		//       columnList.push({
		//         index: i,
		//         html: th.innerHTML,
		//         key: table.getKey(th.dataset.key),
		//         sort: null,
		//         classList: th.classList,
		//         minWidth: th.getBoundingClientRect().width,
		//       });
		//       console.log("setting");
		//       th.addEventListener(
		//         "click",
		//         (e) => {
		//           console.log("clicked");
		//           columns.sort(e.target, table.getKey(th.dataset.key));
		//         },
		//         true,
		//       );
		//       i++;
		//     });
		//     columns.set(columnList);
		//   }, 250);
		// },
		// getKey: (key) => {
		//   if (!key) return;
		//   if (key && key.indexOf("=>") > 0) {
		//     return new Function(`'use strict';return (${key})`)();
		//   }
		//   return (x) => x[key];
		// },
	};

	return table;
}
