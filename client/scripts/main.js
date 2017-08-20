// - weight : MxN 行列（M:前の層/N:現在の層のニューロン数）
// - bias   : 長さNのベクトル（N:現在の層のニューロン数）
var data = {
    layers: [
        {
            type: 'input',
            neuron_count: 5
        },
        {
            type: 'hidden',
            neuron_count: 3,
            weight: [// 5x3行列
                [1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0]
            ],
            bias: [0.0, 0.0, 0.0], // 長さ3のベクトル
            activation_func: 'relu'
        },
        {
            type: 'hidden',
            neuron_count: 4,
            weight: [// 3x4行列
                [1.0, 1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0, 1.0],
                [1.0, 1.0, 1.0, 1.0]
            ],
            bias: [0.0, 0.0, 0.0, 0.0], // 長さ4のベクトル
            activation_func: 'relu'
        },
        {
            type: 'output',
            neuron_count: 2,
            weight: [// 4x2行列
                [1.0, 1.0],
                [1.0, 1.0],
                [1.0, 1.0],
                [1.0, 1.0]
            ],
            bias: [0.0, 0.0], // 長さ2のベクトル
            activation_func: 'relu'
        }
    ]
};

var FigureBox = React.createClass({
    render: function() {
        var box_width = $('div#FigureArea').width();
        var box_height = $('div#FigureArea').height();
        var step_width = box_width / (this.props.data.layers.length + 1);

        var layers_dom = this.props.data.layers.map(function(layer, idx) {
            var cx = step_width * (idx + 1);

            console.log(layer);

            return (
                <circle key={idx} cx={cx} cy="100" r="16" fill="red" />
            );
        });

        return (
            <svg className="figureBox">
                {layers_dom}
            </svg>
        );
    }
});

ReactDOM.render(
    <FigureBox data={data} />,
    document.getElementById('FigureArea')
);

