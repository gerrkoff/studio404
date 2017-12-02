import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar as MuiToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Toolbar extends Component {

    render() {
        return (
            <div>
                <MuiToolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu>
            <MenuItem primaryText="All Broadcasts" />
            <MenuItem primaryText="All Voice" />
            <MenuItem primaryText="All Text" />
            <MenuItem primaryText="Complete Voice" />
            <MenuItem primaryText="Complete Text" />
            <MenuItem primaryText="Active Voice" />
            <MenuItem primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </MuiToolbar>
            </div>
        );
    }
}

export default Toolbar;