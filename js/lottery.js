
//move
var move = function(obj, attrs, duration, fx, callback) { //运动对象，属性，持续时间，运动方式，回调函数
		clearInterval(obj.iTimer);
		//var startTime = Date.now();
		var startTime = new Date();
		var j = {};
		for(var attr in attrs) {
			j[attr] = {};
			if(attr == 'opacity') {
				j[attr].b = Math.round(css(obj, attr) * 100);
			} else {
				j[attr].b = parseInt(css(obj, attr));
			}
			j[attr].c = attrs[attr] - j[attr].b;
		}
		var d = duration;
		obj.iTimer = setInterval(function() {
			var t = new Date() - startTime;
			if(t >= d) {
				t = d;
				clearInterval(obj.iTimer);
			}
			for(var attr in attrs) {
				var v = Tween[fx](t, j[attr].b, j[attr].c, d);
				if(attr == 'opacity') {
					obj.style.opacity = v / 100;
					obj.style.filter = 'alpha(opacity=' + v + ')';
				} else {
					obj.style[attr] = v + 'px';
				}
			}
			if(t == d) {
				callback && callback();
			}
		}, 16);
	},
	css = function(obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}

//Tween
var Tween = {
	linear: function(t, b, c, d) { //匀速
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) { //加速曲线
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) { //减速曲线
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) { //加速减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) { //加加速曲线
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) { //减减速曲线
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d / 2) == 2) {
			return b + c;
		}
		if(!p) {
			p = d * (0.3 * 1.5);
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if(t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.10158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		if((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if(t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
}



//
//var Ajax={
//  get: function (url,fn){
//      var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
//      obj.open('GET',url,true);
//      obj.onreadystatechange=function(){
//          if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
//              fn.call(this, obj.responseText);  //从服务器获得数据
//          }
//      };
//      obj.send(null);
//  },
//  post: function (url, data, fn) {
//      var obj = new XMLHttpRequest();
//      obj.open("POST", url, true);
//      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
//      obj.onreadystatechange = function () {
//          if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
//              fn.call(this, obj.responseText);
//          }
//      };
//      obj.send(data);
//  }
//}


	let getID = (id) => {
		return document.getElementById(id);
	};
	let list = getID('lottery-list');
	let run = getID("run");
export default class lottery {
		constructor(info) {
			if(typeof(info) != "object") {
				console.log("参数错误");
				return false;
			};
			this.lotteryCardlist = getID('lottery-cardlist');
			this.lotteryListHeight = this.lotteryCardlist.offsetHeight; //列表的高度
			this.time = info.time || 0;
			this.total = info.total || 9; //跑几圈
			this.start = 0; //计数器
			this.ms = info.ms || 500; //动画时长
			this.award = info.award || 1;
			this.animate = "linear";
			this.remember = info.ms;
		}
		run() {
			let cardlist = this.lotteryCardlist;
			var that = this;
			if(that.start ==0){
				that.animate ="easeIn";
				that.ms=that.ms+1000;
			}else{
				that.animate ="linear";
				that.ms=that.remember;
			}
			console.log(this.animate);
			console.log(this.ms);
			move(cardlist, { "top": -this.lotteryListHeight + 260 }, this.ms, this.animate, callback);

			function callback() {
				cardlist.style.top = "-70px";
				that.start++;
				if(that.start < that.total) {
					that.run();
				} else if(that.start >= that.total) {
					move(cardlist, { "top": -that.award * 110 - 70 + 110 }, 4000, "backOut");
					document.getElementById("times").innerHTML = --that.time;
				}
			}
		}
	}
