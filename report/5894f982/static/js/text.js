function v_index(number) {
  if (number % 10 === 1) {
    return number + 'st';
  } else if (number % 10 === 2) {
    return number + 'nd';
  } else if (number % 10 === 3) {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}

function v_number(number, noun) {
  if (number === 1) {
    return number + ' ' + noun;
  } else {
    return number + ' ' + noun + 's';
  }
}

function v_capital(text, capital='first') {
  if (capital === 'first') {
    return text[0].toUpperCase() + text.substr(1);
  }
  else if (capital === 'all') {
    return text.split(' ').map(function(t){return v_capital(t, 'first')}).join(' ');
  }
  else {
    return text;
  }
}

function v_empty(text, value) {
  if(value !== "") {
    return text.replace("%s", value);
  }
  else {
    return "";
  }
}

function v_tag(text, tag) {
  return '<' + tag + '>' + text + '</' + tag + '>';
}

function v_tagValue(text, tag, values) {
  return '<' + tag + ' ' + values + '>' + text + '</' + tag + '>';
}

function c(what, color) {
  return v_tagValue(what,'span', 'style="color: ' + color + '"')
}

function center(what) {
  return v_tagValue(what, 'span', 'style="text-align: center"');
}

function br(text) {
  return text + '<br>';
}

function b(text) {
  return v_tag(text, 'b');
}

function i(text) {
  return v_tag(text, 'i');
}

function u(text) {
  return v_tag(text, 'u');
}

function s(text) {
  return v_tag(text, 's');
}