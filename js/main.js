/*
 * jQuery References
 */

var $mainGradient = $('#mainGradient');
var $barGradient = $('#barGradient');
var $cultureInputForm = $('#cultureInput');
var $leftColorInputForm = $('#leftColor');
var $rightColorInputForm = $('#rightColor');
var $leftHex = $('#leftHex');
var $rightHex = $('#rightHex');
var $cssDiv = $('#css');

/*
 * State
 */

var state = {
    culture_data: {
        'Western': western,
        'Japanese': japanese,
        'Hindu': hindu,
        'Native American': native_american,
        'Asian': asian,
        'Chinese': chinese,
        'Asian': asian,
        'Eastern European': eastern_european,
        'Muslim': muslim,
        'African': african,
        'South American': south_american
    },
    current_culture: 'Western'
};

/*
 * Initialization
 */

$(document).ready(mainFn);

function mainFn() {
    populateCultureFormInput();
    populateCultureThemeInputs(state.culture_data['Western']);
    randomValueUpdate();
    updateGradientFromForm();
    updateHexValues();
    updateDisplayCSS();
    startEventListeners();
}

/*
 * event listeners for culture, left color, right color
 */

 function startEventListeners() {
   cultureInputChange();
   colorInputChanges();
 }

 function cultureInputChange() {
   $cultureInputForm.change(function(e) {
       state.current_culture = $cultureInputForm.val();
       populateCultureThemeInputs(state.culture_data[state.current_culture]);
       randomValueUpdate();
       updateGradientFromForm();
       updateHexValues();
   });
 }

function colorInputChanges() {
  $leftColorInputForm.change(function(e) {
      updateGradientFromForm();
      updateDisplayCSS();
      updateHexValues();
  });
  $rightColorInputForm.change(function(e) {
      updateGradientFromForm();
      updateDisplayCSS();
      updateHexValues();
  });
}

function updateHexValues() {
  var current_culture_data = state.culture_data[state.current_culture];
  $rightHex.text(current_culture_data[$rightColorInputForm.val()])
  $leftHex.text(current_culture_data[$leftColorInputForm.val()]);
}

/*
 * Culture
 */

 function populateCultureFormInput() {
     Object.keys(state.culture_data).forEach(function(culture) {
         $cultureInputForm.append('<option value="' + culture + '">' + culture + '</option>');
     });
 }

function populateCultureThemeInputs(culture_data) {
    clearColorThemeInputs();
    Object.keys(culture_data).sort().forEach(function(key) {
        $leftColorInputForm.append('<option value="' + key + '">' + key + '</option>');
        $rightColorInputForm.append('<option value="' + key + '">' + key + '</option>');
    })
}

function clearColorThemeInputs() {
    $leftColorInputForm.empty();
    $rightColorInputForm.empty();
}

/*
 * Gradient Updating
 */

function updateGradientFromForm() {
    var left_color = grabColor('LEFT');
    var right_color = grabColor('RIGHT');
    updateMainGradientAndBarGradient(left_color, right_color);
}

function grabColor(side) {
    var current_culture_data = state.culture_data[state.current_culture];
    if (side === 'LEFT') return current_culture_data[$leftColorInputForm.val()];
    if (side === 'RIGHT')return current_culture_data[$rightColorInputForm.val()];
}

function updateMainGradientAndBarGradient(leftColor, rightColor) {
    $mainGradient.css('background', 'linear-gradient(to right, ' + leftColor + ', ' + rightColor + ')');
    $barGradient.css('background', 'linear-gradient(to right, ' + leftColor + ' 50%, ' + rightColor + ' 50%)');
}

/*
* CSS display
*/

function updateDisplayCSS() {
  var css_background = $mainGradient.css('background');
  var css_prefix = 'rgba(0, 0, 0, 0)';
  var css_suffix = 'repeat scroll 0% 0% / auto padding-box border-box';
  var trimmed_css_background = css_background.replace(css_prefix, '').replace(css_suffix, '');
  $cssDiv.text('background: ' + trimmed_css_background)
}

/*
* random updating of gradient
*/

function randomValueUpdate() {
  $leftColorInputForm.val(randomSelection());
  $rightColorInputForm.val(randomSelection());
}

function randomSelection() {
  var options = $("#leftColor > option");
  var rand = (Math.floor(Math.random()* $("#leftColor > option").length));
  return options[rand].value;
}
