// 'use strict'
// const test = require('tape'); // TAP harness
// const Nightmare = require('nightmare'); // Browser Automator
// const nightmare_config = {show: true, gotoTimeout: 3000};
//
// // decide which URL to test for
// let TESTING_URL, localhost;
// if (process.env.TESTING_URL === 'PRODUCTION') {
//   TESTING_URL = 'http://culturecolors.xyz';
// } else {
//   TESTING_URL = 'http://localhost:3000';
//   localhost = require('express')();
//   localhost.use('/', require('express').static(__dirname));
//   localhost = localhost.listen('3000', () => console.log('listening on port 3000'));
// }
//
// // main function call
// main();
//
// // browser automation, interact-scrape-test
// function main() {
//     new Nightmare(nightmare_config)
//         .goto(TESTING_URL)
//         .evaluate(dispatch_actions_and_gather_pageInfo)
//         .end()
//         .then((page_info) => test_suite(page_info))
//         .catch((err) => console.log(err))
// }
//
// // dispatch actions/change state to new_test_State, then return redux state/bvg
// // *occurs in DOM for cultureColors.xyz outside of node.js scope
// function dispatch_actions_and_gather_pageInfo() {
//     let new_test_state = [store, 'Western', 'Cold', 'Anger'];
//
//     // dispatch a series of actions to change Culture and Values
//     (function changeStateTo(store, culture, first_value, second_value) {
//       store.dispatch({type:'CULTURE_CHANGE',culture:culture})
//       store.dispatch({type:'VALUE_CHANGE',side:'LEFT',value:first_value})
//       store.dispatch({type:'VALUE_CHANGE',side:'RIGHT',value:second_value})
//     })(...new_test_state)
//
//     let test_background = document.body.style.background;
//     let test_state = store.getState();
//     let left_hex = document.getElementById('left_color_hex').innerText;
//     let right_hex = document.getElementById('right_color_hex').innerText;
//     let hex_values_displayed = [left_hex, right_hex]
//
//     //  return Background, Redux state, and culture_data.js object lookup
//     return { test_background, test_state, cultures, hex_values_displayed}
// }
//
// // receives page_info from nightmare.evaluate(),
// //   asserting it against expected results.
// function test_suite(page_info) {
//     let actual_background = page_info.test_background;
//     let actual_state = page_info.test_state;
//     let actual_hexes = page_info.hex_values_displayed;
//     let expected_background = "linear-gradient(to right, rgb(41, 128, 185), rgb(231, 76, 60))";
//     let expected_state = { culture: 'Western', first_value: 'Cold', 'second_value': 'Anger' };
//
//     test('background matches expected', T => {
//         T.plan(2);
//         T.notEqual(actual_background, null);
//         T.deepEqual(actual_background, expected_background);
//     });
//
//     test('state matches expected', T => {
//         T.plan(2);
//         T.notEqual(actual_state, null);
//         T.deepEqual(actual_state, expected_state);
//     });
//
//     test('Cultures are all present', T => {
//       let cultures = Object.keys(page_info.cultures);
//       T.plan(1);
//       T.equal(cultures.length, 10);
//     });
//
//     test('Hex values are shown and match state', T => {
//       T.plan(4);
//       T.equal(actual_hexes[0], '#2980B9');
//       T.notEqual(actual_hexes[0], null);
//       T.equal(actual_hexes[1], '#E74C3C');
//       T.notEqual(actual_hexes[1], null);
//     })
//
//     // if testing localhost, shutdown server after testing
//     test.onFinish(() => {
//       if (localhost) localhost.close();
//     });
// }


describe("a boilerplate test for Cruz", function() {
  it("acts like a duck", function() {
    expect('duck').toBe('duck');
  });
});
