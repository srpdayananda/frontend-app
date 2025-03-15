import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DialpadIcon from "@mui/icons-material/Dialpad";

import { EUserActionMode } from "../../../enums/user-action-mode.enum";
import { IUserDetail } from "../../../interface/user-detail.interface";
import profileImage from "../../../../../assets/images/profile-image.png";

interface IUserDetailsProps {
  user: IUserDetail;
}

const UserCard: React.FC<IUserDetailsProps> = ({ user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const editUserClickHandler = () => () => {
    navigate(`${EUserActionMode.Edit}/${user.id}`);
    handleMenuClose();
  };

  const resetPasswordClickHandler = () => () => {
    handleMenuClose();
  };

  const resetPinClickHandler = () => () => {
    handleMenuClose();
  };

  const formatString = (input: string): string => {
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <Card className="user-card-main-content">
      <CardContent className="user-card">
        <IconButton
          className="more-options-icon"
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MoreVertOutlinedIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={editUserClickHandler()}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Edit User
          </MenuItem>
          <MenuItem onClick={resetPasswordClickHandler()}>
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            Reset Password
          </MenuItem>
          <MenuItem onClick={resetPinClickHandler()}>
            <ListItemIcon>
              <DialpadIcon fontSize="small" />
            </ListItemIcon>
            Reset Pin
          </MenuItem>
        </Menu>
        <div>
          <img
            src={user?.imageUrl ? user?.imageUrl : profileImage}
            alt="user card image"
            className="user-card-image"
          />
        </div>
        <div>
          <Typography className="user-card-name">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography className="user-card-role">
            {formatString(user.roles[0])}
          </Typography>
        </div>
        <div>
          <Typography className="user-card-email">{user.email}</Typography>
          <Typography className="user-card-phone">
            {user.phoneNumber}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
