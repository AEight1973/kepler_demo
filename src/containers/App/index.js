import React from 'react';
import { Map } from "../KeplerGl";
import './style.css';
import {ConfigProvider} from "antd";

function App() {
  return (
      <ConfigProvider
          theme={{
              // algorithm: theme.darkAlgorithm,
              token: {
                  colorPrimary: "#697385",
                  colorPrimaryHover: "#20adc8",
              }
          }}
      >
          <div className="App">
              <Map></Map>
          </div>
      </ConfigProvider>

  )
}

export default App;
