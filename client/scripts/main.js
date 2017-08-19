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

var Box = React.createClass({
    render: function() {
        var layers_dom = this.props.data.layers.map(function(layer, idx) {
            console.log(layer);
            return (
                <div key={idx}>{layer.type}</div>
            );
        });
        return (
            <div className="box">
                <h1>Title</h1>
                <hr />
                {layers_dom}
            </div>
        );
    }
});

ReactDOM.render(
    <Box data={data} />,
    document.getElementById('Content')
);

