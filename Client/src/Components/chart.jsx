import React from "react";
import Chart from "@qognicafinance/react-lightweight-charts";
export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    var data = [];

    this.props.price.forEach((i) => {
      let price = i.Predicted_Price;
      let date = i.Date;
      const formatdate = date.split("T");
      date = formatdate[0];
      data.push({ time: date, value: price });
    });
    this.state = {
      options: {
        timeScale: {
          timeVisible: false,
          secondsVisible: false,
          fixLeftEdge: true,
        },
        priceScale: {
          position: "left",
          mode: 1,
          autoScale: false,
          borderVisible: false,
        },
      },
      lineSeries: [
        {
          data,
        },
      ],
    };
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">Chart - {this.props.metal}</div>
        <Chart
          options={this.state.options}
          areaSeries={this.state.lineSeries}
          autoWidth
          height={454}
          from={this.props.from}
          to={this.props.to}
        />
      </div>
    );
  }
}
