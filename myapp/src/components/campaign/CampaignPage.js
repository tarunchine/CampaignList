import axios from "axios";
import "rc-pagination/assets/index.css";
import React, { Component } from "react";
import CampaignController from "../../controllers/CampaignController";
import CampaignList from './CampaignList';
import './campaignPage.css';

class CampaignPage extends Component {
    state = {
        campaignFetched: false,
        errorMsg: "",
        campaignsToShow: []
    };
    componentWillMount() {
        document.addEventListener("dataChanged", event => {
            this.setState({
                campaignsToShow: CampaignController.getCampaignsToShow()
            });
        });
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "./mockdata/data.json"
        })
            .then(response => {
                CampaignController.setCampaigns(response.data);
                this.setState({
                    campaignFetched: true,
                    campaignsToShow: CampaignController.getCampaignsToShow()
                });
            })
            .catch(error => {
                this.setState({
                    campaignFetched: true,
                    errorMsg: error.message
                });
            });
    }
    searchCampaigns = event => {
        let searchText = event.target.value;
        CampaignController.searchCampaign(searchText);
    };
    renderCampaigns() {
        let { campaignFetched, errorMsg, campaignsToShow } = this.state;
        if (errorMsg) {
            return <p className="error-msg">{errorMsg}</p>;
        } else if (campaignFetched) {
            return (
                <div>
                    <form className="campaign__search">
                        <input type='text' onChange={this.searchCampaigns} placeholder="Search Campaign by name"/>
                    </form>
                    <CampaignList campaigns={campaignsToShow} />
                </div>
            );
        } else {
            return <p>Fetching Campaigns...</p>;
        }
    }
    render() {
        return (
            <div className='campaignpage'>
                <h2 className="campaignpage__heading">Campaigns</h2>
                {this.renderCampaigns()}
            </div>
        );
    }
}

export default CampaignPage;
