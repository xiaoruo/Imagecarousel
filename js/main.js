window.onload = function() {
	var oBox = document.getElementById("box");
	var oList = oBox.children[0].children[0];
	var aImg = oBox.getElementsByTagName("img");
	var prev = oBox.children[1];
	var next = oBox.children[2];
	var timer = null,playTimer = null;
	var index = 0;
	var bOrder = true;
	var aTmp = [];
	var aBtn = null;

	(function() {
		for (var i = 0; i < aImg.length; i++){
			aTmp.push("<li>" + "</li>");
		}
		var oCount = document.createElement("ul");
		oCount.className = "count";
		oCount.innerHTML = aTmp.join("");
		oBox.appendChild(oCount);
		aBtn = oBox.getElementsByTagName("ul")[0].getElementsByTagName("li");
		/*oBox.onclick = function(event){
			if(event.target.tagName.toLowerCase() == 'li'){
				event.target.innerHTML = i
				console.log(event.target)
				index = this.index;
				cutover();
			}
		};*/
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].index = i;
			aBtn[i].onclick = function() {
				index = this.index;
				cutover();
			};
		}
	})();

	prev.onclick = function() {
		if (index === 0) {
			index = aBtn.length-1;
		} else {
			index --;
		}
		cutover();
	};
	next.onclick = function() {
		if (index == aBtn.length-1) {
			index = 0;
		} else {
			index ++;
		}
		cutover();
	};



	function cutover() {
		for (var i = 0; i < aBtn.length; i++){
			aBtn[i].className = "";
		}
		aBtn[index].className = "current";
		startMove(-(index * aImg[0].offsetWidth));
	}

	function move() {
		bOrder ? index++ : index--;
		if (index <= 0) {
			index = 0;
			bOrder = true;
		} else if (index >= aBtn.length - 1) {
			index = aBtn.length - 1;
			bOrder = false;
		}
		cutover();
	}
	playTimer = setInterval(move, 2000);
	oBox.onmouseover = function() {
		clearInterval(playTimer);
	};

	oBox.onmouseout = function() {
		playTimer = setInterval(move, 2000);
	};

	function startMove(iTarget) {
		clearInterval(timer);
		timer = setInterval(function() {
			doMove(iTarget);
		}, 30);
	}

	function doMove(iTarget) {
		var iSpeed = (iTarget - oList.offsetLeft) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		oList.offsetLeft === iTarget ? clearInterval(timer) : oList.style.left = oList.offsetLeft + iSpeed + "px";
	}
};