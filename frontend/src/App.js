import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import GrayLoader from './gray-circle-loader.svg';
import GreenLoader from './green-circle-loader.svg';
import './App.css';
import ReactTooltip from 'react-tooltip';
import api from './api';

import Report from './Report';

const toastr = window.toastr;

function App() {
  const [items, setItems] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentAction, setCurrentAction] = useState('');

  async function load() {
    setItems(await api.getItems());
    setDataLoaded(true);
  }

  async function resetState() {
    try {
      setCurrentAction('resettingItems');
      await api.resetItems();
      await load();
    } catch {
      toastr.error('Error occured');
    } finally {
      toastr.success('State resetting completed');
      setCurrentAction('');
    }
  }

  function visibleItems() {
    let result = [];
    for (let item of items) {
      if (item.state !== 'Blocked') {
        result.push(<Report key={item._id} itemDetails={item} reloadItems={load} />);
      }
    }
    return result;
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <h1>Reports</h1>

      <div className="App-reset-state-container">
        <span onClick={() => resetState()} data-tip="Reset state of all items to default one" className="App-reset-state-link">
          Reset state
          {
            currentAction === 'resettingItems' ?
            <img src={GrayLoader} className="App-CircleLoaderImg" alt="gray-loader" />
            :
            <i className="material-icons-round">
              refresh
            </i>
          }
        </span>
      </div>

      {
        !dataLoaded ?
        <img className="App-circle-data-loader" alt="green-circle-loader" src={GreenLoader} />
        :
        null
      }

      {visibleItems()}

      <ReactTooltip delayShow={100} className="App-react-tooltip" place="bottom" />
    </div>
  );
}

export default App;
