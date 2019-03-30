import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import CampaignController from '../../controllers/CampaignController';
import Campaign from './Campaign';

class CampaignList extends Component {
  pageLimit = 10;
  state ={
    currentPage: 1,
    editCampaign: {}
  }
  onChange = (page) => {
    console.log(page);
    this.setState({
      currentPage: page,
    });
  }
  editCampaign = (campaign, event) => {
    console.log(campaign)
    this.setState({
      editCampaign: campaign
    })
  }
  updateCampaign = (event) => {
    event.preventDefault();
    var name = this.refs['name'].value;
    CampaignController.updateCampaign(this.state.editCampaign._id, name);
    this.setState({
      editCampaign: {}
    })
  }
  removeCampaign = (campaign) => {
    CampaignController.removeCampaign(campaign._id);
  }
  closePopup = () => {
    this.setState({
      editCampaign: {}
    })
  }
  render(){
    let {campaigns} = this.props;
    let campaignToDisplay = campaigns.slice((this.state.currentPage-1)*this.pageLimit, (this.state.currentPage-1)*this.pageLimit + this.pageLimit);
    if(campaignToDisplay.length ===0) {
      return <p>No Campaign Found</p>
    }
    return <div className="campaignlist">
        <table className="campaignlist__table">
          <thead>
            <tr>
              <td> Campaign Name</td>
              <td> Type</td>
              <td> Actions</td>
            </tr>
          </thead>
          { campaignToDisplay.map( (campaign) => {
            return <Campaign campaign={campaign} editCampaign={this.editCampaign} removeCampaign={this.removeCampaign}/>
          })}
        </table>
        <div className="pagination-container">
          <Pagination onChange={this.onChange} current={this.state.currentPage} total={campaigns.length} />

        </div>
        <div >
        <Modal visible={!!this.state.editCampaign._id} effect="fadeInUp" width='300' >
              <div className="editCamapaign__popup">
                <p className="popup__close" onClick={this.closePopup}><i class="far fa-times-circle"></i></p>
                  <h1>Edit Campaign</h1>
                  <form onSubmit={this.updateCampaign}>
                    <input type="text" defaultValue={this.state.editCampaign.name} ref="name"/>
                    <button type="submit">Update</button>
                  </form>
                  
              </div>
          </Modal>
          </div>
      </div>
  }
}

export default CampaignList;
