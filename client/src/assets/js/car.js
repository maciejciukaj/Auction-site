var x_axis = 0,
  y_axis = 0;
console.log(window.location.pathname);
document.onkeydown = check_key;

function setCar() {
  if (window.location.pathname == "/") {
    const car = document.getElementById("car");

    console.log(x_axis + "  " + y_axis + " moja funkcja");
    var rect = car.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    car.style.left = rect.left;
    car.style.top = rect.top;
  }
}

function check_key(e) {
  if (window.location.pathname == "/") {
    e = e || window.event;

    if (e.keyCode == "38") {
      mov_car("up");
    } else if (e.keyCode == "40") {
      mov_car("down");
    } else if (e.keyCode == "37") {
      mov_car("left");
    } else if (e.keyCode == "39") {
      mov_car("right");
    }
  }
}

function mov_car(a) {
  if (window.location.pathname == "/") {
    console.log(x_axis + "  " + y_axis);
    if (a == "right") {
      x_axis = x_axis + 10;
      $(".car").css({
        transform: "translate(" + x_axis + "px," + y_axis + "px)  rotate(0deg)",
      });
    } else if (a == "left") {
      x_axis = x_axis - 10;
      $(".car").css({
        transform:
          "translate(" + x_axis + "px," + y_axis + "px) rotate(180deg)",
      });
    } else if (a == "up") {
      y_axis = y_axis - 10;
      $(".car").css({
        transform: "translate(" + x_axis + "px," + y_axis + "px)rotate(270deg)",
      });
    } else if (a == "down") {
      y_axis = y_axis + 10;
      $(".car").css({
        transform: "translate(" + x_axis + "px," + y_axis + "px) rotate(90deg)",
      });
    }
    setCar();
  }
}
