// variables found in culture_data.js:
//    *   cultures [array of culture names],
//    *   culture_list [object lookup for culture's color data]

// DOM references
var select_culture = document.getElementById('culture');
var select_first_value = document.getElementById('first_value');
var select_second_value = document.getElementById('second_value');
var shuffle_button = document.getElementById('shuffle');

// initial Cultures and Values chosen at random
var initial_culture = randomCulture();
var initial_state = {
  culture: initial_culture,
  first_value: randomValue(initial_culture),
  second_value: randomValue(initial_culture)
};

// redux, see reducer
var store = Redux.createStore(reducer);

// initial application setup
(function init(){
  updateBackgroundGradient();
  populateOptions();
  populateCultures();
  synchronizeSelectInputs();
  store.subscribe(render);
  console.log('INIT: ', store.getState());
  shuffle_button.addEventListener('click', dispatchShuffle);
}())

// callback to run after every redux state change
function render() {
  updateBackgroundGradient();
  populateOptions();
  synchronizeSelectInputs();
  console.log('RENDER: ', store.getState());
}

// takes a Culture and two Values, returns them as object/state
function newState(culture, first_value, second_value) {
  return { culture, first_value, second_value }
}


function reducer(state, action) {
  console.log('ACTION: ', action);
  switch (action.type) {

    case '@@redux/INIT': return initial_state

    case 'CULTURE_CHANGE':
      return newState(action.culture, randomValue(action.culture), randomValue(action.culture))

    case 'VALUE_CHANGE':
      var prev_store = store.getState();
      if (action.side === 'LEFT') {
        return newState(prev_store.culture, action.value, prev_store.second_value)
      } else if (action.side === 'RIGHT') {
        return newState(prev_store.culture, prev_store.first_value, action.value)
      } else {
        return state
      }

    case 'SHUFFLE':
      var rand_cult = randomCulture();
      return newState(rand_cult, randomValue(rand_cult), randomValue(rand_cult))

    default:
      return state;
  }
}

// updates background colors based on the current state
function updateBackgroundGradient() {
  var curr_state = store.getState();
  var curr_culture = curr_state.culture;
  var first_value = curr_state.first_value;
  var second_value = curr_state.second_value;
  var left_color = cultures[curr_culture][first_value];
  var right_color = cultures[curr_culture][second_value];
  var linear_gradient = 'linear-gradient(to right,'+left_color+','+right_color+')';
  document.body.style.background = linear_gradient;
}

// updates Culture and Values select tags to match user's choice
function synchronizeSelectInputs() {
  var state = store.getState();
  var curr_culture_keys = Object.keys(cultures[state.culture]);
  select_first_value.selectedIndex = curr_culture_keys.indexOf(state.first_value);
  select_second_value.selectedIndex = curr_culture_keys.indexOf(state.second_value);
  select_culture.selectedIndex = cultures_list.indexOf(store.getState().culture);
}

// clear Values and new options based on current Culture
function populateOptions() {
  select_first_value.innerHTML = select_second_value.innerHTML = '';
  var state = store.getState();
  var curr_culture_keys = Object.keys(cultures[state.culture]);
  curr_culture_keys.forEach(add_option_value_to_select)
}

// adds a Value option to both select inputs
function add_option_value_to_select(value) {
  select_first_value.add(option_constructor(value));
  select_second_value.add(option_constructor(value));
}

// constructs an option element given a Value
function option_constructor(value) {
  var option = document.createElement("option");
  option.text = value;
  option.nodeValue = value;
  return option
}

// populates the Culture input with options
function populateCultures() {
  select_culture.innerHTML = '';
  cultures_list.forEach(function(culture) {
    select_culture.add(option_constructor(culture));
  });
}

// handler for left/right Values, dispatches action for value change
function valueSelectHandler(event) {
  var SIDE = (event.target.id === 'first_value') ? 'LEFT' : 'RIGHT';
  store.dispatch({
    type: 'VALUE_CHANGE',
    side: SIDE,
    value: event.target.value
  });
}

// handler for left/right Values, dispatches action for culture change
function cultureSelectHandler(event) {
  store.dispatch({
    type: 'CULTURE_CHANGE',
    culture: event.target.value
  });
}

// handler for shuffle button, shuffles state
function dispatchShuffle(e) {
  store.dispatch({type: 'SHUFFLE'});
}

// returns a random Value given a Culture
function randomValue(culture) {
  var culture_keys = Object.keys(cultures[culture]);
  var rand_key = Math.floor(Math.random() * culture_keys.length);
  return culture_keys[rand_key];
}

// returns a random Culture
function randomCulture() {
  var rand_key = Math.floor(Math.random() * cultures_list.length);
  return cultures_list[rand_key];
}
