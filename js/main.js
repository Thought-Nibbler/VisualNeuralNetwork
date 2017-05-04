$(function() {
    // canvasのコンテキスト
    var context       = document.getElementById('view').getContext('2d');
    // ニューラルネットワーク
    var neuralNetwork = null;
    // 隠れ層の数
    var hiddenLayerCount = parseInt($('#HiddenLayerCount input').val(), 10);
    // 最後に描画されたニューラルネットワークの各層のニューロン数
    var latestNeuronCounts = new Array();

    // ニューラルネットワークの更新
    var reloadNeuralNetwork = function() {
        var neuronCounts = new Array();
        neuronCounts.push(parseInt($('#InputLayer input').val(), 10));
        for (let i = 0; i < hiddenLayerCount; i++) {
            neuronCounts.push(parseInt($('#HiddenLayer' + (i + 1).toString() + ' input').val(), 10));
        }
        neuronCounts.push(parseInt($('#OutputLayer input').val(), 10));

        neuralNetwork = new VNN.NeuralNetwork(neuronCounts);

        neuralNetwork.Draw(context);

        latestNeuronCounts = neuronCounts.slice();
    };

    // コントロールパネルの更新
    var reloadControlPanel = function() {
        $('#NeuronCount').html('');

        var neuronCountHtml = '';
        neuronCountHtml += '<div class="Layer" id="InputLayer">';
        neuronCountHtml += '  <span>入力層のニューロン数 : </span>';
        neuronCountHtml += '  <input type="number" value="3" min="1" max="15" />';
        neuronCountHtml += '</div>';
        for (let i = 0; i < hiddenLayerCount; i++) {
            neuronCountHtml += '<div class="Layer" id="HiddenLayer' + (i + 1).toString() + '">';
            neuronCountHtml += '  <span>隠れ層' + (i + 1).toString() + 'のニューロン数 : </span>';
            neuronCountHtml += '  <input type="number" value="10" min="1" max="15" />';
            neuronCountHtml += '</div>';
        }
        neuronCountHtml += '<div class="Layer" id="OutputLayer">';
        neuronCountHtml += '  <span>出力層のニューロン数 : </span>';
        neuronCountHtml += '  <input type="number" value="1" min="1" max="15" />';
        neuronCountHtml += '</div>';

        $('#NeuronCount').html(neuronCountHtml);

        $('#InputLayer input').off('change click keyup');
        $('#InputLayer input').on('change click keyup', function(e) {
            if (latestNeuronCounts[0] !== parseInt($('#InputLayer input').val(), 10)) {
                reloadNeuralNetwork();
            }
        });
        for (let i = 0; i < hiddenLayerCount; i++) {
            $('#HiddenLayer' + (i + 1).toString() + ' input').off('change click keyup');
            $('#HiddenLayer' + (i + 1).toString() + ' input').on('change click keyup', function(e) {
                if (latestNeuronCounts[i + 1] !== parseInt($('#HiddenLayer' + (i + 1).toString() + ' input').val(), 10)) {
                    reloadNeuralNetwork();
                }
            });
        }
        $('#OutputLayer input').off('change click keyup');
        $('#OutputLayer input').on('change click keyup', function(e) {
            if (latestNeuronCounts[latestNeuronCounts.length - 1] !== parseInt($('#OutputLayer input').val(), 10)) {
                reloadNeuralNetwork();
            }
        });
    };

    // 初期化
    var reload = function() {
        reloadControlPanel();
        reloadNeuralNetwork();
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

