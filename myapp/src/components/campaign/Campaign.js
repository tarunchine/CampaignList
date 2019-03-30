import React, { Component } from 'react';
class Campaign extends Component {
    render() {
        let { campaign, editCampaign, removeCampaign } = this.props;
        return (
            <tr className="campaign">
                <td className="campaign__name">{campaign.name}</td>
                <td>{campaign.type}</td>
                <td className="campaign__actions">
                    <span onClick={editCampaign.bind(this, campaign)} className="far fa-edit">
                        
                    </span>
                    <span onClick={removeCampaign.bind(this, campaign)} className="fas fa-trash-alt">
                        
                    </span>
                </td>
            </tr>
        );
    }
}

export default Campaign;