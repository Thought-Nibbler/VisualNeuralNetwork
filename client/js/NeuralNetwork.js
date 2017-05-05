////////////////////////////////////////////////
/// ニューラルネットワーク
////////////////////////////////////////////////
VNN.NeuralNetwork = function(neuronCounts) {
    var me = this;

    // 層の配列
    var Layers = new Array(neuronCounts.length);

    // ニューラルネットワークの描画
    this.Draw = function(context, isRedrawLayerSetting) {
        // Canvasのクリア
        var w = parseInt($('#view').attr('width'), 10);
        var h = parseInt($('#view').attr('height'), 10);
        context.clearRect(0, 0, w, h);

        if (isRedrawLayerSetting) {
            // LayerSettingPanelのクリア
            $('#LayerSettingPanel').empty();
        }

        context.strokeStyle = 'black';

        d3.selection()
            .selectAll('xxx') // 存在しない要素を指定することで、空のリストを生成
            .data(Layers)     // データの個数分だけリストに空オブジェクトを追加
            .enter()          // 追加した空オブジェクトにデータを割り当てる
            .each(function(layer, layerIdx) {
                var margin           = 70;
                var neuronSize       = 20;
                var layerSettingSize = 70;
                var centerX          = ((layerIdx + 1) * (neuronSize + margin));
                var topY             = 5;

                var changeEvent = function(e) {
                    var oldVal = layer.Neurons.length;
                    var newVal = parseInt($(this).val(), 10);
                    var divId  = $(this).parent().attr('id');

                    if (newVal !== oldVal) {
                        MakeLayer(newVal, layerIdx);
                        if (layerIdx !== (Layers.length - 1)) {
                            MakeLayer(Layers[layerIdx + 1].Length(), layerIdx + 1);
                        }
                        me.Draw(context, false);
                    }
                };

                // 層の描画
                layer.Draw(context, centerX, topY, neuronSize);

                if (isRedrawLayerSetting) {
                    // 層の設定HTMLを追加
                    layer.AppendLayerSettingHtml(centerX, topY, layerSettingSize, layerIdx, changeEvent);
                }
            });

        $('canvas#view').off('click');
        $('canvas#view').on('click', function(e) {
            var clickedObj = null;
            Layers.forEach(function(layer) {
                var obj = layer.GetClickedObj(e.offsetX, e.offsetY);
                if (obj !== null) {
                    clickedObj = obj;
                }
            });

            console.info('type : ' + clickedObj.type);
            console.log(clickedObj.data);
        });
    };

    // 各層の作成関数
    var MakeLayer = function(neuronCount, layerIdx) {
        if (layerIdx === 0) {
            // 入力層の作成
            Layers[layerIdx] = new VNN.InputLayer(neuronCount);
            Layers[layerIdx].InitNeurons();
        }
        else if (layerIdx === (Layers.length - 1)) {
            // 出力層の作成
            Layers[layerIdx] = new VNN.OutputLayer(neuronCount);
            Layers[layerIdx].InitNeurons(Layers[layerIdx - 1].Length());
        }
        else {
            // 隠れ層の作成
            Layers[layerIdx] = new VNN.HiddenLayer(neuronCount);
            Layers[layerIdx].InitNeurons(Layers[layerIdx - 1].Length());
        }
    };

    // 各層の作成
    neuronCounts.forEach(MakeLayer);
};

