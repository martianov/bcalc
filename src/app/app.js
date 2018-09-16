import React from 'react';
import styles from './app.css';


const NumberInput = (props) => {
  let onChange = (event) => props.setValue(event.target.value);

  return(
    <input type="number" className={styles.number_field} value={props.value} disabled={!props.enabled} onChange={onChange}/>
  );
}

const OperationButton = (props) => {
  let className = styles.operation_button;
  if (props.selected == props.operation) {
    className += " " + styles.down;
  }
  let onClick = () => props.setOperation(props.operation);

  return (
      <button className={className} disabled={!props.enabled} onClick={onClick}>{props.label}</button>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {waiting: false};
  }

  setA = (a) => {
    this.setState({ a });
  }

  setB = (b) => {
    this.setState({ b });
  }

  setOperation = (operation) => {
    this.setState({ operation });
  }

  setResult = (result) => {
    this.setState({ result, waiting: false });
  }

  startWaiting = () =>{
    this.setState({ result: "", waiting: true });
  }

  calculate = () => {
    var url = new URL('http://' +  window.location.host + '/calc'), params = {a: this.state.a, b: this.state.b, op: this.state.operation};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    this.startWaiting();
    fetch(url)
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      }).then((response) => {
        return response.json();
      }).then((response) => {
        this.setResult(' = ' + response);
      }).catch((error) => {
        this.setResult("Something went wrong..");
      });
  }

  render = () => {
    let isControlsEnabled = !this.state.waiting;
    let isCalculateButtonEnabled = isControlsEnabled && this.state.a && this.state.b && this.state.operation
      && !(this.state.b == 0 && (this.state.operation == 'divide' || this.state.operation == 'remainder'));

    let opButtonProps = {setOperation: this.setOperation, selected: this.state.operation, enabled: isControlsEnabled};

    return (
      <div className={styles.container}>
        <NumberInput value={this.state.a} setValue={this.setA} enabled={isControlsEnabled}/>
        <div className={styles.operation_buttons}>
          <OperationButton label='&#65291;' operation='add' {...opButtonProps}/>
          <OperationButton label='&#65293;' operation='subtract' {...opButtonProps}/>
          <OperationButton label='&#1645;' operation='multiply' {...opButtonProps}/>
          <OperationButton label='/' operation='divide' {...opButtonProps}/>
          <OperationButton label='%' operation='remainder' {...opButtonProps}/>
        </div>
        <NumberInput value={this.state.b} setValue={this.setB} enabled={isControlsEnabled}/>
        <button className={styles.calculate_button} onClick={this.calculate} disabled={!isCalculateButtonEnabled}>Calculate</button>
        <div className={styles.result_container}>{this.state.result}</div>
      </div>
    );
  }
}
