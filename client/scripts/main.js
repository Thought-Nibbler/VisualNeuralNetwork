var Box = React.createClass({
    render: function() {
        return (
            <div className="box">
              <h1>Title</h1>
              <hr />
              <span>hogehoge</span>
            </div>
        );
    }
});

ReactDOM.render(
    <Box />,
    document.getElementById('Content')
);

