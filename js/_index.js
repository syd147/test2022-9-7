window.onload = function () {
  // 需求1：鼠标经过sildes，显示左右的按钮
  var container = document.querySelector(".container");
  var leftBox = document.querySelector(".arrow>a:first-child");
  var rightBox = document.querySelector(".arrow>a:last-child");

  container.onmouseenter = function () {
    leftBox.style.display = "block";
    rightBox.style.display = "block";

    //鼠标经过时停止轮播
    clearInterval(timer);
  };
  container.onmouseleave = function () {
    leftBox.style.display = "none";
    rightBox.style.display = "none";

    // 鼠标离开时开启轮播
    clearInterval(timer);
    timer = setInterval(function () {
      rightBox.onclick();
    }, 1500);
  };

  //思考：ulLis和olLis在鼠标点击时都会用到排他思想，合二为一
  //封装一个排他函数
  function changeImg(n) {
    //排他思想
    olLis.forEach(function (item, i) {
      item.removeAttribute("class");
      //同步处理图片
      ulLis[i].style.opacity = 0;
    });
    olLis[n].className = "current";
    ulLis[n].style.opacity = 1;
  }

  // 需求2：鼠标点击小圆点下标，切换图片的显示
  var ulLis = document.querySelectorAll("ul li");
  var olLis = document.querySelectorAll("ol li");

  olLis.forEach(function (el, index) {
    el.onclick = function () {
      changeImg(index);

      // 统一索引，否则索引只能从0开始
      count = index;
    };
  });

  // 需求3：点击左右按钮，切换图片的显示
  var flag = true;
  var count = 0;

  rightBox.onclick = function () {
    if (flag) {
      flag = false;
      count++;
      if (count >= ulLis.length) count = 0;
      changeImg(count);
    }
  };

  leftBox.onclick = function () {
    if (flag) {
      flag = false;
      count--;
      if (count < 0) count = ulLis.length - 1;
      changeImg(count);
    }
  };

  // 优化：开启节流阀（截流）
  ulLis.forEach(function (el) {
    el.ontransitionend = function () {
      flag = true;
    };
  });

  // 需求4：自动开启图片切换
  // var timer = setInterval(function () {
  //   // 触发右按钮的点击事件
  //   rightBox.onclick();
  // }, 1500);
  //简写：
  var timer = setInterval(rightBox.onclick, 1500);
};
