
function progress(id) {

    var elementSVG = document.getElementById(id);
    console.log(elementSVG);
    var circle = elementSVG.children[1];
    console.log(circle);
    var circleRadius = parseInt(circle.getAttribute("r"), 10);
    console.log(circleRadius);
    var circleLength = 2 * Math.PI * circleRadius;
    console.log(circleLength);

    circle.style.strokeDasharray = circleLength;

    function setValue(value) {
        value = parseInt(value, 10);
        if (isNaN(value) || value < 0 || value > 100) {
            throw Error("Invalid value " + value)
        }
        var offset = 1 - value / 100;
        circle.style.strokeDashoffset = circleLength * offset;


    }

    setValue(0);

    var currentState = {},
        normalState = {
            animated: false,
            hidden: false
        };

    function setState(state) {
        var currentClassName = "progress";
        if (state.animated === true) {
            currentClassName += " progress_animated ";
        }
        if (state.hidden === true) {
            currentClassName += " progress_hidden ";
        }
        elementSVG.className.baseVal = currentClassName;
        currentState = state;
    }

    setState(normalState);

    function setMod(key, value) {
        value = value === "yes";
        switch (key) {
            case "normal":
                setState(normalState);
                break;

            case "animated":
            case "hidden":
                var newState = Object.assign({}, currentState);
                newState[key] = value;
                setState(newState);
                break;

            default:
                throw Error("Invalid key " + key);

        }
    }

    return {
        setValue: setValue,
        setMod: setMod,
    }
}

var mainProgress = progress("main_progress");
