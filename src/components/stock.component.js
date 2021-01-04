import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';



export default class Stock extends Component {

    constructor(props) {
        super(props);

        this.fetchStock = this.fetchStock.bind(this);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }


    componentDidMount() {
        // Function that will fetch data from the API
        this.fetchStock();
    }

    fetchStock() {

        const API_KEY = 'GQ5YIZC0CGN3KWXP';
        let stockSymbol = 'AMZN';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

        // To process and hold the data from the API call before updating state
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(response => response.json()) // convert to JSON form
            .then(data => {
                
                console.log(data);
            
                // For every key (i.e. date object)
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(parseInt(data['Time Series (Daily)'][key]['5. adjusted close']));
                }
                this.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction
                })
            }    
        )
    }

    render() {


        return (
            <div>
                <h1>Stock Market</h1> 
                {/* <p>x-values: {this.state.stockChartXValues}</p>
                <p>y-values: {this.state.stockChartYValues}</p> */}
                <div>
                    <Line
                        data={{
                        labels: this.state.stockChartXValues,
                        datasets: [
                            {
                            label: 'Stock Price',
                            data: this.state.stockChartYValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 0.2)'
                            },
                        ]
                        }}
                        height={400}
                        width={600}
                    />
                </div>
            </div>
        )
    }
}