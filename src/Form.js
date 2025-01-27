import React from "react";
import "./Form.css";
import { useState } from "react"

function Form() {
  const [input, setUserInput] = useState("")
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")

  function handleUserInput(event) {
    setUserInput(event.target.value)
  }

  function handleOperation(event){
    setOperation(event.target.value)
  }

  const inputArray = input.split(",");
  const numArray = inputArray.map((num) => Number(num));

  const calculateNumArray = (operation) => {

    switch(operation) {
      case "sum":
        getSum(numArray);
        break;
      case "average":
        getAverage(numArray);
        break;
      case "mode":
        getComputedStyle(numArray);
        break;
        default:
          setResult("Invalid input.");
          break;
    }
  }

  function getSum(numArray) {
    const sum = numArray.reduce((total, num)=> {
      return total + num;
    }, 0);
    setResult(sum);
  }

  function getAverage(numArray) {
    const numSum = numArray.reduce((total, num) => {
      return total + Number(num);
    }, 0);
    const numAverage = numSum / numArray.length;
    setResult(numAverage);
  }

  function getMode(numArray) {
    const numCount = {};
    numArray.forEach((num) => {
      numCount[num] = (numCount[num] || 0) + 1;
      });

    const valueArray = Object.values(numCount);
    const highestCount = Math.max(...valueArray);
    const modeIndex = valueArray.indexOf(highestCount);
    const numMode = numArray[modeIndex];
    setResult(numMode);
  }

function handleSubmit(event) {
  event.preventDefault();
  calculateNumArray(operation);
}


return (
  <main>
    <p> Enter each number in the array, seperated by a ','</p>
    <form onSubmit={handleSubmit}>
      <input
        id="values"
        name="values"
        type="text"
        onChange={handleUserInput}
      />
      <select id="operation" name="operation" onChange={handleOperation}>
        <option value=""></option>
        <option value="sum">sum</option>
        <option value="average">average</option>
        <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </main>
  );
}


export default Form;
