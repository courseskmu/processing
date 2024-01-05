(function() {
  var and_expr, and_expr_b, answer_buttons, current, false_button, false_click, hide, log, main, make_randExpr, make_randExpr1, make_randExpr2, make_randExpr3, new_button, new_question_click, next_question, not_expr, not_expr_b, or_expr, or_expr_b, question, rand_bool, rand_choice, rand_element, rand_int_between, rand_literal, rand_num_relation, show, true_button, true_click;
  var __slice = Array.prototype.slice;
  log = function(msg) {
    if (typeof console !== "undefined" && console !== null) {
      return console.log(msg);
    }
  };
  rand_int_between = function(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1) + lo);
  };
  rand_choice = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return items[rand_int_between(0, items.length - 1)];
  };
  rand_element = function(seq) {
    return seq[rand_int_between(0, seq.length - 1)];
  };
  rand_bool = function() {
    return Math.random() <= 0.5;
  };
  not_expr = function(e) {
    return "!" + e;
  };
  not_expr_b = function(e) {
    return "!(" + e + ")";
  };
  or_expr = function(e1, e2) {
    return "" + e1 + " || " + e2;
  };
  or_expr_b = function(e1, e2) {
    return "(" + e1 + ") || (" + e2 + ")";
  };
  and_expr = function(e1, e2) {
    return "" + e1 + " && " + e2;
  };
  and_expr_b = function(e1, e2) {
    return "(" + e1 + ") && (" + e2 + ")";
  };
  rand_num_relation = function() {
    var num, op;
    op = ['<', '>', '<=', '>=', '==', '!='];
    num = '0123456789';
    return rand_element(num) + ' ' + rand_element(op) + ' ' + rand_element(num);
  };
  rand_literal = function() {
    if (rand_bool()) {
      return rand_choice('true', 'false', '!true', '!false');
    } else {
      return rand_num_relation();
    }
  };
  make_randExpr1 = function() {
    var l1, l2, r;
    l1 = rand_literal();
    l2 = rand_literal();
    r = rand_int_between(1, 4);
    switch (r) {
      case 1:
        return l1;
      case 2:
        return and_expr(l1, l2);
      case 3:
        return or_expr(l1, l2);
      case 4:
        return not_expr_b(l1);
    }
  };
  make_randExpr2 = function() {
    var e1, e2, r;
    e1 = make_randExpr1();
    e2 = make_randExpr1();
    r = rand_int_between(1, 3);
    switch (r) {
      case 1:
        return and_expr_b(e1, e2);
      case 2:
        return or_expr_b(e1, e2);
      case 3:
        return not_expr_b(e1);
    }
  };
  make_randExpr3 = function() {
    var e1, e2, r;
    e1 = make_randExpr2();
    e2 = make_randExpr1();
    r = rand_int_between(1, 3);
    switch (r) {
      case 1:
        return and_expr_b(e1, e2);
      case 2:
        return or_expr_b(e1, e2);
      case 3:
        return not_expr_b(e1);
    }
  };
  make_randExpr = function() {
    var r;
    r = Math.random();
    if (r <= 0.1) {
      return make_randExpr1();
    } else if (r <= 0.45) {
      return make_randExpr2();
    } else {
      return make_randExpr3();
    }
  };
  question = '';
  new_button = '';
  true_button = '';
  false_button = '';
  answer_buttons = '';
  next_question = '';
  show = function(b) {
    return b.style.visibility = "visible";
  };
  hide = function(b) {
    return b.style.visibility = "hidden";
  };
  current = {
    expr: '<none>',
    right: 0,
    wrong: 0
  };
  new_question_click = function() {
    current.expr = make_randExpr();
    question.innerHTML = "" + current.expr;
    question.style.color = "black";
    show(answer_buttons);
    return hide(next_question);
  };
  true_click = function() {
    hide(answer_buttons);
    show(next_question);
    if (eval(current.expr)) {
      question.innerHTML += " ... Correct! This expression is true.";
      question.style.color = "green";
      return current.right += 1;
    } else {
      question.innerHTML += " ... Wrong! This expression is false.";
      question.style.color = "red";
      return current.wrong += 1;
    }
  };
  false_click = function() {
    hide(answer_buttons);
    show(next_question);
    if (eval(current.expr)) {
      question.innerHTML += " ... Wrong! This expression is true.";
      question.style.color = "red";
      return current.wrong += 1;
    } else {
      question.innerHTML += " ... Correct! This expression is false.";
      question.style.color = "green";
      return current.right += 1;
    }
  };
  main = function() {
    new_button = document.getElementById("newquestion");
    new_button.onclick = new_question_click;
    true_button = document.getElementById("true");
    true_button.onclick = true_click;
    false_button = document.getElementById("false");
    false_button.onclick = false_click;
    answer_buttons = document.getElementById("answerbuttons");
    next_question = document.getElementById("nextquestion");
    question = document.getElementById("question");
    return new_question_click();
  };
  window.onload = main;
}).call(this);
