// culture data, object and pre-sorted array of display names;
const cultures = require('./culture_data').cultures;
const cultures_list = require('./culture_data').cultures_list;

// DOM references to select/option tags & shuffle btn
const select_culture = document.getElementById('culture');
const select_first_value = document.getElementById('first_value');
const select_second_value = document.getElementById('second_value');
let shuffle_button = document.getElementById('shuffle');

// initial Cultures and Values chosen at random
const initial_culture = randomCulture();
const initial_state = {
  culture: initial_culture,
  first_value: randomValue(initial_culture),
  second_value: randomValue(initial_culture)
};

// redux, see reducer
import { createStore } from 'redux';
let store = createStore(reducer);

// initial application setup
(function init(){
  updateBackgroundGradient();
  populateOptions();
  populateCultures();
  synchronizeSelectInputs();
  updateCurrentHexToDOM()
  store.subscribe(render);
  console.log('INIT: ', store.getState());
  shuffle_button.addEventListener('click', dispatchShuffle);
  require('./extras')();
}())

// callback to run after every redux state change
function render() {
  updateBackgroundGradient();
  populateOptions();
  synchronizeSelectInputs();
  updateCurrentHexToDOM();
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
      let prev_store = store.getState();
      if (action.side === 'LEFT') {
        return newState(prev_store.culture, action.value, prev_store.second_value)
      } else if (action.side === 'RIGHT') {
        return newState(prev_store.culture, prev_store.first_value, action.value)
      } else {
        return state
      }

    case 'SHUFFLE':
      let rand_cult = randomCulture();
      return newState(rand_cult, randomValue(rand_cult), randomValue(rand_cult))

    default:
      return state;
  }
}

// updates background colors based on the current state
function updateBackgroundGradient() {
  let curr_state = store.getState();
  let curr_culture = curr_state.culture;
  let first_value = curr_state.first_value;
  let second_value = curr_state.second_value;
  let left_color = cultures[curr_culture][first_value];
  let right_color = cultures[curr_culture][second_value];
  let linear_gradient = 'linear-gradient(to right,'+left_color+','+right_color+')';
  document.body.style.background = linear_gradient;
}

// updates Culture and Values select tags to match user's choice
function synchronizeSelectInputs() {
  let state = store.getState();
  let curr_culture_keys = Object.keys(cultures[state.culture]);
  select_first_value.selectedIndex = curr_culture_keys.indexOf(state.first_value);
  select_second_value.selectedIndex = curr_culture_keys.indexOf(state.second_value);
  select_culture.selectedIndex = cultures_list.indexOf(store.getState().culture);
}

// clear Values and new options based on current Culture
function populateOptions() {
  select_first_value.innerHTML = select_second_value.innerHTML = '';
  let state = store.getState();
  let curr_culture_keys = Object.keys(cultures[state.culture]);
  curr_culture_keys.forEach(add_option_value_to_select)
}

// adds a Value option to both select inputs
function add_option_value_to_select(value) {
  select_first_value.add(option_constructor(value));
  select_second_value.add(option_constructor(value));
}

// constructs an option element given a Value
function option_constructor(value) {
  let option = document.createElement("option");
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
  let SIDE = (event.target.id === 'first_value') ? 'LEFT' : 'RIGHT';
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
  let culture_keys = Object.keys(cultures[culture]);
  let rand_key = Math.floor(Math.random() * culture_keys.length);
  return culture_keys[rand_key];
}

// returns a random Culture
function randomCulture() {
  let rand_key = Math.floor(Math.random() * cultures_list.length);
  return cultures_list[rand_key];
}

// object lookup for current state's hex values, renders/updates to DOM
function updateCurrentHexToDOM() {
  let curr_state = store.getState();
  let left_color = cultures[curr_state.culture][curr_state.first_value];
  let right_color = cultures[curr_state.culture][curr_state.second_value];
  document.getElementById('left_color_hex').innerText = left_color;
  document.getElementById('right_color_hex').innerText = right_color;
}
