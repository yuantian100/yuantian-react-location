import React, { Component } from 'react';
import Areas from './Areas';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level1SelectedKey: this.props.init[ 0 ],
      level2SelectedKey: this.props.init[ 1 ],
      level3SelectedKey: this.props.init[ 2 ]
    };
  }

  static defaultProps = {
    init    : [ 0, 0, 0 ],
    callback: () => undefined
  }

  onLevel1Change(e) {
    const key = parseInt(e.target.value);
    this.setState({
      level1SelectedKey: key,
      level2SelectedKey: 0,
      level3SelectedKey: 0,
    }, this.createNum);
  }

  onLevel2Change(e) {
    const key = parseInt(e.target.value);
    this.setState({
      level2SelectedKey: key,
      level3SelectedKey: 0,
    }, this.createNum);
  }

  onLevel3Change(e) {
    const key = parseInt(e.target.value);
    this.setState({
      level3SelectedKey: key,
    }, this.createNum);
  }

  createNum() {
    const level1 = this.state.level1SelectedKey;
    const level2 = this.state.level2SelectedKey;
    const level3 = this.state.level3SelectedKey;

    const type = Areas[ level1 ].type;

    const l1 = level1;
    const l2 = level2 == Areas[ level1 ].sub.length - 1 ? 999 : level2;
    const l3 = type == 1 && level3 == Areas[ level1 ].sub[ level2 ].sub.length - 1 ? 999 : level3;

    const num = l1 * 1000000 + l2 * 1000 + l3;
    this.props.callback(num);
  }

  render() {

    let level1Data = [];
    let level2Data = [];
    let level3Data = [];

    Areas.map((v) => { level1Data.push(v.name) });

    const type = Areas[ this.state.level1SelectedKey ].type;
    if (type == 0) {
      level2Data = Areas[ this.state.level1SelectedKey ].sub;
    } else {
      const data = Areas[ this.state.level1SelectedKey ].sub;
      let array  = [];
      for (let i = 0; i < data.length; i++) {
        array.push(data[ i ].name);
      }
      level2Data = array;
      level3Data = Areas[ this.state.level1SelectedKey ].sub[ this.state.level2SelectedKey ].sub;
    }

    return (
        <div>
          <select value={this.state.level1SelectedKey} name='level1' onChange={(e) => this.onLevel1Change(e)}>{
            level1Data.map(function (v, k) {
              return <option key={k} value={k}>{v}</option>
            })}
          </select>

          <select value={this.state.level2SelectedKey} name='level2' onChange={(e) => this.onLevel2Change(e)}>{
            level2Data.map(function (v, k) {
              return <option key={k} value={k}>{v}</option>
            })}
          </select>

          {level3Data.length ?
              <select value={this.state.level3SelectedKey} name='level3' onChange={(e) => this.onLevel3Change(e)}>{
                level3Data.map(function (v, k) {
                  return <option key={k} value={k}>{v}</option>
                })}
              </select>
              : null
          }
        </div>
    );
  }
}

export default Location;