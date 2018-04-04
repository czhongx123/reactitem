



var sortArrAndGetIndex={
 arrayKeys(arr) {
	var i = 0,
		len = arr.length,
		keys = [];
	while(i < len) {
		keys.push(i++);
	}
	return keys;
},
// 判断变量是否为数组

// 堆排序
 heapSort(arr, keys, order) {
	if(!isArray(arr) || !isArray(keys)) return;
	var order = (order + '').toLowerCase() == 'desc' ? order : 'asc';
	// 交换位置
	function changePos(arr, cur, left) {
		var tmp;
		tmp = arr[cur];
		arr[cur] = arr[left];
		arr[left] = tmp;
	}
	// 构造二叉堆
	function heap(arr, start, end, isMax) {
		var isMax = isMax == undefined ? true : isMax, // 是否最大堆，否为最小堆
			cur = start, // 当前节点的位置
			left = 2 * cur + 1; // 左孩子的位置
		for(; left <= end; cur = left, left = 2 * left + 1) {
			// left是左孩子，left + 1是右孩子
			if(left < end && ((isMax && arr[left] < arr[left + 1]) || (!isMax && arr[left] > arr[left + 1]))) {
				left++; // 左右子节点中取较大/小者
			}
			if((isMax && arr[cur] >= arr[left]) || (!isMax && arr[cur] <= arr[left])) {
				break;
			} else {
				// 原index跟随排序同步进行
				changePos(keys, cur, left);
				changePos(arr, cur, left);
			}
		}
	}
	return(function() {
		// 从(n/2-1) --> 0逐次遍历。遍历之后，得到的数组实际上是一个二叉堆
		for(var len = arr.length, i = Math.floor(len / 2) - 1; i >= 0; i--) {
			heap(arr, i, len - 1, order == 'asc');
		}
		// 从最后一个元素开始对序列进行调整，不断的缩小调整的范围直到第一个元素
		for(i = len - 1; i > 0; i--) {
			changePos(keys, 0, i);
			changePos(arr, 0, i);
			// 调整arr[0...i - 1]，使得arr[0...i - 1]仍然是一个最大/小堆
			// 即，保证arr[i - 1]是arr[0...i - 1]中的最大/小值
			heap(arr, 0, i - 1, order == 'asc');
		}
	})();
}


	
	
	
}
module.exports = sortArrAndGetIndex