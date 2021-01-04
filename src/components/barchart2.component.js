import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const BarChart2 = () => {

    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);


    const chart = () => {

        let empSal = [];
        let empAge = [];

        axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => {
                console.log(res);
                // Push the data into the arrays
                for (const dataObj of res.data.data) {
                    empSal.push(parseInt(dataObj.employee_salary));
                    empAge.push(parseInt(dataObj.employee_age));
                }
            

            })
            .catch(err => {
                console.log(err);
            })

        console.log(empSal);
        console.log(empAge);

    }

    useEffect(() => {
        chart();
    }, []);

    return (
        <div>
            <h1>Test</h1> 
        </div>
    )

}

export default BarChart2;