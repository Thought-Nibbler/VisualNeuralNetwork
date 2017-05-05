$(function() {
    // canvasのコンテキスト
    var context = document.getElementById('view').getContext('2d');
    // ニューラルネットワーク
    var neuralNetwork = null;
    // 隠れ層の数
    var hiddenLayerCount = parseInt($('#HiddenLayerCount input').val(), 10);

    // ニューラルネットワークの初期化
    var reload = function() {
        var neuronCounts = new Array();

        neuronCounts.push(3);
        for (let i = 0; i < hiddenLayerCount; i++) {
            neuronCounts.push(10);
        }
        neuronCounts.push(1);

        neuralNetwork = new VNN.NeuralNetwork(neuronCounts);

        neuralNetwork.Draw(context, true);
    };
    reload();

    $('#HiddenLayerCount input').off('change click keyup');
    $('#HiddenLayerCount input').on('change click keyup', function(e) {
        var newHiddenLayerCount = parseInt($(this).val(), 10);

        if (hiddenLayerCount !== newHiddenLayerCount) {
            hiddenLayerCount = newHiddenLayerCount;

            reload();
        }
    });

});

