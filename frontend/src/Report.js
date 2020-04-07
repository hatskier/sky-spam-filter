import React, { useState } from 'react';
import RedLoader from './red-circle-loader.svg';
import GreenLoader from './green-circle-loader.svg';
import ReactTooltip from 'react-tooltip';
import api from './api';
import config from './config';
import './Report.css';

const toastr = window.toastr;

function Report({ itemDetails, reloadItems }) {
  const [currentAction, setCurrentAction] = useState(null);

  async function setItemState(newState) {
    const action = newState === 'Resolved' ? 'resolving' : 'blocking';
    setCurrentAction(action);
    try {
      await api.setItemState(itemDetails._id, newState);
      await reloadItems();
      if (newState === 'Blocked') {
        toastr.success(`Item has been blocked`);
      } else {
        toastr.success(`Item has been resolved`);
      }
    } catch {
      toastr.error('Error occured');
    } finally {
      if (newState !== 'Blocked') { 
        // We don't update this component's state, because it will be unmounted
        setCurrentAction(null);
      }
    }
  }

  return (
    <div className="Report-card">
      <div className="Report-data">
        <div className="Report-id">
          <span className="bold">Id: </span>
          <span>{ itemDetails._id.slice(14, 24) }</span>
        </div>
        <div className="Report-type">
          <span className="bold">Type: </span>
          <span>{ itemDetails.type }</span>
        </div>
        <div className="Report-state">
          <span className="bold">State: </span>
          <span>{ itemDetails.state }</span>
        </div>
        <div className="Report-message">
          <span className="bold">Message: </span>
          <span>{ itemDetails.message }</span>
        </div>
      </div>

      <div className="Report-details-link-container">
        <a
          data-tip="Download archive with backend code"
          className="Report-details-link"
          href={`${config.api}/details`}
          download >
          Details
        </a>
      </div>

      {
        itemDetails.state === 'Resolved' ?
        null
        :
        <div className="Report-actions-container">
          <div onClick={() => setItemState('Resolved')} className="Report-actions-button resolve-button mdc-button">
            Resolve
            {
              currentAction === 'resolving' ?
              (<img className="Report-CircleLoaderImg" src={GreenLoader} alt="green-loader" />)
              :
              (<i className="material-icons-round">
                done
              </i>)
            }
          </div>

          <div onClick={() => setItemState('Blocked')} className="Report-actions-button block-button mdc-button">
            Block
            {
              currentAction === 'blocking' ?
              (<img className="Report-CircleLoaderImg" src={RedLoader} alt="green-loader" />)
              :
              (<i className="material-icons-round">
                block
              </i>)
            }
          </div>
        </div>
      }



      <ReactTooltip delayShow={100} className="App-react-tooltip" place="bottom" />
    </div>

    
  );
}

export default Report;
