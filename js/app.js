import style from "../css/app.css";
import lottery from "./lottery.js";
window.onload = () => {
	document.getElementById('run').onclick = function() {
		//调用ajax记得加lock，防止多次点击
		/*
		 * total:转几圈   number
		 * ms:动画速度毫秒 number
		 * time:抽奖机会  number
		 * award:中的啥奖 number
		 */
		var _lot = new lottery({ "total": 9, "ms": 500, "time": 5, "award": 4 });
		_lot.run();
	}
}