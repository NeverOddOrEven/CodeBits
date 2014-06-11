var Converter = function () {
    this.numberToFullTextRepresentation = function (numberParameter) {
        return toText(numberParameter.toString(), 0);
    }

    var onesAndTeens = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tensPlusOnes = ['ten', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    var appendices = ['thousand', 'million', 'billion', 'trillion'];

    // Recursive function to spell out the printing of a number
    function toText(str, depth) {
        if (str.indexOf(".") !== -1) {
            var leftOfDecimal = left(str, str.indexOf("."));
            var rightOfDecimal = right(str, str.length - (str.indexOf(".") + 1));
            return toText(leftOfDecimal, 0) + " point " + toText(rightOfDecimal, 0);
        }
        if (str.length > 3) {
            // Must trim, or exclusion of 'zero' is not parsed properly
            var leftText = toText(left(str, str.length - 3), depth + 1).trim();
            var midText = left(lastSix(str), lastSix(str).length - 3);
            var rightText = toText(right(str, 3), 0).trim();

            // Dealing with orders of magnitude, you have to peak at the 
            // order above the current order, not just recursion depth. 
            // Otherwise, it is impossible to avoid
            // situations like ("one billion million thousand")
            var order = midText === '000' ? '' : appendices[depth];

            return (leftText + ' ' + order + ' ' + rightText);
        }
        if (str.length > 2) {
            // Must trim, or exclusion of 'zero' is not parsed properly
            var leftText = toText(left(str, str.length - 2), 0).trim();
            var rightText = toText(right(str, 2), 0).trim();

            leftText = (leftText.length === 0) ? leftText : leftText + ' hundred';
            rightText = (rightText.length === 0) ? rightText : 'and ' + rightText;

            return (leftText + ' ' + rightText);
        }

        var index = new Number(str);
        if (index >= 20) {
            var leftDigit = tensPlusOnes[new Number(left(str, 1)) - 1];
            var rightDigit = onesAndTeens[new Number(right(str, 1))];
            return leftDigit + (rightDigit.length === 0 ? '' : '-') + rightDigit;
        } else {
            return onesAndTeens[index];
        }
    }

    /* Readable helper method(s) 
     *    Take specified number of characters from a string starting from the right or left
     */
    function left(t, length) {
        return t.slice(0, length);
    }

    function right(t, length) {
        return t.slice(t.length - length);
    }

    function lastSix(t) {
        return t.slice(t.length - (t.length > 6 ? 6 : t.length), t.length);
    }
};
