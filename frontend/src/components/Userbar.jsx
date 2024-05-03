import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Menu,
  Avatar,
  MenuItem,
  Link,
  CircularProgress,
  Button,
} from "@mui/material";
import { logoutUser } from "../redux/thunks/authThunks";
import { BASE_URL } from "../constants";
import useSelectUserAuth from "../hooks/useSelectUserAuth";
import useSelectLoading from "../hooks/useSelectLoading";

const Userbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { token, profile } = useSelectUserAuth();
  const loading = useSelectLoading();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/sign-in");
  };

  if (!token) {
    return loading ? (
      <CircularProgress color="inherit" />
    ) : (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button to="/sign-in" component={RouterLink} variant="contained">
          Sign In
        </Button>
        <Button to="/sign-up" component={RouterLink} variant="contained">
          Sign Up
        </Button>
      </Box>
    );
  }

  const avatarSrc = profile?.avatar ? `${BASE_URL}/${profile?.avatar}` : "";

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        disableRipple
        title="Open menu"
        onClick={handleOpenUserMenu}
        sx={{ p: 0 }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Avatar src={avatarSrc} alt="profile picture" />
        )}
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Link to="/profile" component={RouterLink} sx={{ color: "inherit" }}>
            Profile
          </Link>
        </MenuItem>

        <MenuItem sx={{ mt: 1 }} onClick={handleCloseUserMenu}>
          <Link
            onClick={handleLogout}
            disabled={loading}
            component="button"
            sx={{ color: "inherit" }}
          >
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Userbar;
