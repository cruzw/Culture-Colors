var cultures_list = ["African", "Asian", "Chinese", "Eastern European", "Hindu", "Japanese", "Muslim", "Native American", "South American", "Western"];
var initial_culture = randomCulture();
var initial_state = {
  culture: initial_culture,
  first_value: randomValue(initial_culture),
  second_value: randomValue(initial_culture)
}
var store = Redux.createStore(reducer);
var select_culture = document.getElementById('culture');
var select_first_value = document.getElementById('first_value');
var select_second_value = document.getElementById('second_value');
var shuffle_button = document.getElementById('shuffle');

init()

function init() {
  store.subscribe(render)
  render()
  populateOptions()
  populateCultures()
  synchronizeSelectInputs();
  shuffle_button.addEventListener('click', function dispatchShuffle(e) {
    store.dispatch({type: 'SHUFFLE'})
  })
}

function reducer(state, action) {
  console.log('ACTION: ', action);
  if (state === undefined || state === null) {
    state = initial_state;
  }
  switch (action.type) {
    case 'CULTURE_CHANGE':
      return {
        culture: action.culture,
        first_value: randomValue(action.culture),
        second_value: randomValue(action.culture)
      }
    case 'VALUE_CHANGE':
      var prev_store = store.getState();
      if (action.side === 'LEFT') {
        return {
          culture: prev_store.culture,
          first_value: action.value,
          second_value: prev_store.second_value
        }
      } else if (action.side === 'RIGHT') {
        return {
          culture: prev_store.culture,
          first_value: prev_store.first_value,
          second_value: action.value
        }
      } else {
        return state
      }
    case 'SHUFFLE':
      var new_culture = randomCulture();
      return {
        culture: new_culture,
        first_value: randomValue(new_culture),
        second_value: randomValue(new_culture)
      }
    default:
      return state;
  }
  //end of: switch
}

function render() {
  updateBackgroundGradient();
  populateOptions();
  synchronizeSelectInputs();
  console.log('RENDER: ', store.getState());
}

function updateBackgroundGradient() {
  var curr_state = store.getState();
  var curr_culture = curr_state.culture;
  var first_value = curr_state.first_value;
  var second_value = curr_state.second_value;
  var left_color = cultures[curr_culture][first_value]
  var right_color = cultures[curr_culture][second_value]
  // cascade up to modern browsers styling
  var webkit = '-webkitlinear-gradient(left, ' + left_color + ', ' + right_color + ')';
  document.body.style.background = webkit;
  var moz = '-moz-linear-gradient(to right, ' + left_color + ', ' + right_color + ')';
  document.body.style.background = moz;
  var o = '-o-linear-gradient(to right, ' + left_color + ', ' + right_color + ')';
  document.body.style.background = o;
  var linear_gradient = 'linear-gradient(to right, ' + left_color + ', ' + right_color + ')';
  document.body.style.background = linear_gradient;
}

function synchronizeSelectInputs() {
  var state = store.getState();
  var curr_culture = cultures[state.culture];
  var curr_culture_keys = Object.keys(curr_culture);
  select_first_value.selectedIndex = curr_culture_keys.indexOf(state.first_value);
  select_second_value.selectedIndex = curr_culture_keys.indexOf(state.second_value);
  select_culture.selectedIndex = cultures_list.indexOf(store.getState().culture);
}

function populateOptions() {
  var state = store.getState();
  var curr_culture = cultures[state.culture];
  var curr_culture_keys = Object.keys(curr_culture);
  select_first_value.innerHTML = '';
  select_second_value.innerHTML = '';
  curr_culture_keys.forEach(function(value) {
    select_first_value.add(option_constructor(value));
    select_second_value.add(option_constructor(value));
  })
}

function option_constructor(value) {
  var option = document.createElement("option");
  option.text = value;
  option.nodeValue = value;
  return option
}

function populateCultures() {
  select_culture.innerHTML = '';
  cultures_list.forEach(function(culture) {
    select_culture.add(option_constructor(culture))
  })
}


function valueSelectHandler(event) {
  if (event.target.id === 'first_value') {
    store.dispatch({
      type: 'VALUE_CHANGE',
      side: 'LEFT',
      value: event.target.value
    })
  } else if (event.target.id === 'second_value') {
    store.dispatch({
      type: 'VALUE_CHANGE',
      side: 'RIGHT',
      value: event.target.value
    })
  }
}

function cultureSelectHandler(event) {
  store.dispatch({
    type: 'CULTURE_CHANGE',
    culture: event.target.value
  })
}

function randomValue(culture) {
  var culture_keys = Object.keys(cultures[culture]);
  var rand_key = Math.floor(Math.random() * culture_keys.length);
  return culture_keys[rand_key];
}

function randomCulture() {
  var rand_key = Math.floor(Math.random() * cultures_list.length);
  return cultures_list[rand_key];
}
