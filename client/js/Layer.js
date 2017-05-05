////////////////////////////////////////////////
/// 層
////////////////////////////////////////////////
VNN.Layer = class {
    // コンストラクタ（共通）
    constructor(neuronCount) {
        this.Neurons   = new Array(neuronCount);
        this.WeightObj = {
            Left : 0,
            Top  : 0,
            Size : 0
        };
        this.BiasObj   = {
            Left : 0,
            Top  : 0,
            Size : 0
        };
    }

    // ニューロン数を取得（共通）
    Length() {
        return this.Neurons.length;
    }

    // ニューロンの値を設定（入力層以外）
    InitNeurons(weightLength) {
        if (this instanceof VNN.InputLayer) {
            for (let i = 0; i < this.Neurons.length; i++) {
                this.Neurons[i] = new VNN.Neuron();
            }
            return;
        }

        for (let i = 0; i < this.Neurons.length; i++) {
            let weight = new Array(weightLength);
            let bias   = 0;
            let neuron = null;
            for (let i = 0; i < this.Neurons.length; i++) {
                // 重み
                for (let i = 0; i < weight.length; i++) {
                    weight[i] = Math.random();
                }
                // バイアス
                bias = Math.random();
                // ニューロン
                this.Neurons[i] = new VNN.Neuron(weight, bias);
            }
        }
    }

    // 重み行列をクリックしたかどうか判定する
    IsHitWeightObj(x, y) {
        var cx = this.WeightObj.Left;
        var cy = this.WeightObj.Top;
        var r  = this.WeightObj.Size;
        if (((x - cx) * (x - cx)) + ((y - cy) * (y - cy)) < (r * r)) {
            return true;
        }

        return false;
    }

    // バイアスをクリックしたかどうか判定する
    IsHitBiasObj(x, y) {
        var cx = this.BiasObj.Left;
        var cy = this.BiasObj.Top;
        var r  = this.BiasObj.Size;
        if (((x - cx) * (x - cx)) + ((y - cy) * (y - cy)) < (r * r)) {
            return true;
        }

        return false;
    }

    // クリックされた図形を取得する
    GetClickedObj(x, y) {
        var clickedObj = null;

        this.Neurons.forEach(function(neuron) {
            if (neuron.IsHit(x, y)) {
                clickedObj = neuron;
            }
        });

        if (clickedObj !== null) {
            return { type : 'neuron', data : clickedObj };
        }

        if (this.IsHitWeightObj(x, y)) {
            let weightMatrix = new Array();

            this.Neurons.forEach(function(neuron) {
                weightMatrix.push(neuron.Weight);
            });

            return { type : 'weight', data : weightMatrix };
        }

        if (this.IsHitBiasObj(x, y)) {
            let biasVector = new Array();

            this.Neurons.forEach(function(neuron) {
                biasVector.push(neuron.Bias);
            });

            return { type : 'bias', data : biasVector };
        }

        return null;
    }

    // 描画（入力層以外）
    Draw(context, centerX, topY, size) {
        var margin = 5;

        if (!(this instanceof VNN.InputLayer)) {
            let x = centerX - Math.floor(size / 2) - (size + margin);
            let y = topY + (size + margin);
            let r = Math.floor(size / 2);

            context.beginPath();
            context.arc(x, y, r, 0, 2 * Math.PI, false);
            context.closePath();
            context.stroke();
            this.WeightObj.Left = x;
            this.WeightObj.Top  = y;
            this.WeightObj.Size = r;

            y += ((size + margin) * 1);

            context.beginPath();
            context.arc(x, y, r, 0, 2 * Math.PI, false);
            context.closePath();
            context.stroke();
            this.BiasObj.Left = x;
            this.BiasObj.Top  = y;
            this.BiasObj.Size = r;
        }

        let x = centerX - Math.floor(size / 2);
        let y = topY;

        context.beginPath();
        this.Neurons.forEach(function(neuron) {
            neuron.Draw(context, x, y, size);
            y += (size + margin);
        });
        context.closePath();
        context.stroke();
    }

    // 層の設定HTMLを追加
    AppendLayerSettingHtml(centerX, topY, size, layerIdx, changeEvent) {
        var layerSettingHtml = '';
        var divStyle = '';
        var inputStyle = '';
        var neuronCount = this.Neurons.length;

        divStyle += 'style="';
        divStyle += 'position : absolute;';
        divStyle += 'left : ' + (centerX - Math.floor(size / 2)) + 'px;';
        divStyle += 'width : ' + size + 'px;';
        divStyle += 'height : 100%;';
        divStyle += '"';

        inputStyle += 'style="';
        inputStyle += 'margin : 10px 5px;';
        inputStyle += 'width : 60px;';
        inputStyle += '"';

        layerSettingHtml += '<div id="Layer_' + layerIdx + '" ' + divStyle + '>';
        layerSettingHtml += '  <input type="number" value="' + neuronCount + '" min="1" max="1000" ' + inputStyle + ' />';
        layerSettingHtml += '</div>';

        $('#LayerSettingPanel').append(layerSettingHtml);

        var nowVal = this.Neurons.length;

        $('#LayerSettingPanel div#Layer_' + layerIdx + ' input').off('change click keyup');
        $('#LayerSettingPanel div#Layer_' + layerIdx + ' input').on('change click keyup', changeEvent);
    }
};

////////////////////////////////////////////////
/// 入力層
////////////////////////////////////////////////
VNN.InputLayer = class extends VNN.Layer {
};

////////////////////////////////////////////////
/// 隠れ層
////////////////////////////////////////////////
VNN.HiddenLayer = class extends VNN.Layer {
};

////////////////////////////////////////////////
/// 出力層
////////////////////////////////////////////////
VNN.OutputLayer = class extends VNN.Layer {
};

