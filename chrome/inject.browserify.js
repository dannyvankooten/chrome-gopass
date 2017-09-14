(function(d) {
	function queryAllVisible(parent, selector, form) {
	  var result = [];
	  var elems = parent.querySelectorAll(selector);
	  for (var i=0; i < elems.length; i++) {
		// Elem or its parent has a style 'display: none',
		// or it is just too narrow to be a real field (a trap for spammers?).
		if (elems[i].offsetWidth < 50 || elems[i].offsetHeight < 10) { continue; }
		// Select only elements from specified form
		if (form && form != elems[i].form) { continue; }
		var style = window.getComputedStyle(elems[i]);
		// Elem takes space on the screen, but it or its parent is hidden with a visibility style.
		if (style.visibility == 'hidden') { continue; }
		// This element is visible, will use it.
		result.push(elems[i]);
	  }
	  return result;
	}
	function queryFirstVisible(parent, selector, form) {
	  var elems = queryAllVisible(parent, selector, form);
	  return (elems.length > 0) ? elems[0] : undefined;
	}
	function form() {
	  var passwordField = queryFirstVisible(d, 'input[type=password]', undefined);
	  return (passwordField && passwordField.form) ? passwordField.form : undefined;
	}
	function field(selector) {
	  return queryFirstVisible(d, selector, form()) || document.createElement('input');
	}
	function update(el, value) {
	  if( ! value.length ) {
		return false;
	  }
	  el.setAttribute('value', value);
	  el.value = value;
	  var eventNames = [ 'click', 'focus', 'keypress', 'keydown', 'keyup', 'input', 'blur', 'change' ];
	  eventNames.forEach(function(eventName) {
		el.dispatchEvent(new Event(eventName, {"bubbles":true}));
	  });
	  return true;
	}
	if (typeof form() === 'undefined') {
	  return;
	}
	update(field('input[type=password]'), login.p);
	update(field('input[id=username], input[id=user_name], input[id=userid], input[id=user_id], input[id=login], input[id=email], input[type=email], input[type=text]'), login.u);
	var password_inputs = queryAllVisible(form(), 'input[type=password]');
	if (password_inputs.length > 1) {
	  password_inputs[1].select();
	} else {
		window.requestAnimationFrame(function() {
 field('[type=submit]').click();
		});
	 }
  })(document);
