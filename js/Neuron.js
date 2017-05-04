////////////////////////////////////////////////
/// ニューロン
////////////////////////////////////////////////
VNN.Neuron = function(_weight, _bias) {
    var me = this;

    if (typeof(_weight) !== 'undefined') {
        this.Weight = _weight.slice();
    }

    if (typeof(_bias) !== 'undefined') {
        this.Bias = _bias;
    }

    this.OutValue = Math.random();

    var Left = 0;
    var Top  = 0;
    var Size = 0;

    this.Draw = function(context, x, y, size) {
        context.rect(x, y, size, size);

        Left = x;
        Top  = y;
        Size = size;
    };

    this.IsHit = function(x, y) {
        if ((Left <= x && x <= (Left + Size)) && (Top <= y && y <= (Top + Size))) {
            return true;
        }

        return false;
    };
};

