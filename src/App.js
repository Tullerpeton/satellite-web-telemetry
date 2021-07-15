import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Select, Tabs} from 'antd';
import {SatelliteSelect, OSM, Passes, Location, Radar, Time, Update} from "./componentLib"
const TabPane = Tabs.TabPane;
class App extends Component {

  render() {
    //const Option = Select.Option
    return (
      <div className="App">

            <SatelliteSelect></SatelliteSelect>
                <OSM></OSM>
            <Location/>
            <br/>




    <div className='Edge'>
    </div>
    <div className='VariableInput'>
    </div>
<div>
<br/>
</div>
      </div>
    );
  }
}

export default App;
