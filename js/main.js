let $mainGradient = $('#mainGradient');
let $barGradient = $('#barGradient');
let $cultureInputForm = $('#cultureInput');
let $leftColorInputForm = $('#leftColor');
let $rightColorInputForm = $('#rightColor');

let cultures = [
    'Western/American',
    'Japanese',
    'Hindu',
    'Native American',
    'Chinese',
    'Asian',
    'Eastern European',
    'Muslim',
    'African',
    'South American'
];

// map out cultures to 'Culture' form input options
cultures.forEach(function(cult) {
    $cultureInputForm.append('<option value="' + cult + '">' + cult + '</option>')
});

// event listener for 'Culture' input selection
$cultureInputForm.change(function(e) {
    console.log($cultureInputForm.val());
});

// event listener for 'Left Color' input selection
$leftColorInputForm.change(function(e) {
    updateGradient()
});

// event listener for 'Right Color' input selection
$rightColorInputForm.change(function(e) {
    updateGradient()
});


// initialization
populateColorThemes(westernCulture);
$leftColorInputForm.val("Earthy");
$rightColorInputForm.val("Nature");
updateGradient();

// clear 'Left Color'/'Right Color' form inputs, and (re)populate color themes;
function populateColorThemes(culture) {
    $leftColorInputForm.empty();
    $rightColorInputForm.empty();
    Object.keys(culture).sort().forEach(function(key) {
        $leftColorInputForm.append('<option value="' + key + '">' + key + '</option>')
        $rightColorInputForm.append('<option value="' + key + '">' + key + '</option>')
    })
}

// update gradients from form
function updateGradient() {
    let leftColor = grabColor('left')
    let rightColor = grabColor('right')
    updateMainAndBar(leftColor, rightColor)
}

function updateMainAndBar(leftColor, rightColor) {
    $mainGradient.css('background', 'linear-gradient(to right, ' + leftColor + ', ' + rightColor + ')');
    $barGradient.css('background', 'linear-gradient(to right, ' + leftColor + ' 50%, ' + rightColor + ' 50%)')
}

// returns current color given a side of gradient
function grabColor(side) {
    if (side === 'left') return westernCulture[$leftColorInputForm.val()];
    if (side === 'right') return westernCulture[$rightColorInputForm.val()];
}
