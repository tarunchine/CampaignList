class CampaignController {
    constructor() {
        this.campaigns = [];
        this.searchText = "";
        this.campaignsToShow = [];
    }
    setCampaigns(campaigns) {
        this.campaigns = campaigns;
    }
    getAllCampains() {
        return [...this.campaigns];
    }
    getCampaignsToShow() {
        if (!!this.searchText) {
            let searchResult = [];
            this.campaigns.map(campaign => {
                if (campaign.name.toLowerCase().indexOf(this.searchText) !== -1) {
                    searchResult.push(campaign);
                }
            });
            return searchResult;
        } else {
            return [...this.campaigns];
        }
    }
    searchCampaign(searchText) {
        this.searchText = searchText.toLowerCase();
        this.triggerChange();
    }
    removeCampaign(id) {
        let campaignIndex;
        for (let i = 0, len = this.campaigns.length; i < len; i++) {
            if (this.campaigns[i]._id === id) {
                campaignIndex = i;
                break;
            }
        }
        this.campaigns.splice(campaignIndex, 1);
        this.triggerChange(this.campaigns);
    }
    updateCampaign(id, name) {
        for (let i = 0, len = this.campaigns.length; i < len; i++) {
            if (this.campaigns[i]._id === id) {
                this.campaigns[i].name = name;
                break;
            }
        }
        this.triggerChange();
    }
    triggerChange(updatedData) {
        var event = new CustomEvent("dataChanged", { detail: updatedData });
        document.dispatchEvent(event);
    }
}

export default new CampaignController();
