import { TreeItem, TreeView } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import PreviewIcon from "@mui/icons-material/Preview";
import logo from "../../Images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";

const SideBar = () => {
  return (
    <>
      <div className="leftSideBar">
        <img src={logo} alt="" style={{ width: "100%" }} />
        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandLessIcon />}
            defaultExpandIcon={<ExpandMoreIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<AppsIcon />} />
              </Link>
              <Link to="/admin/create/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p>
            <ShoppingBagIcon /> Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <GroupIcon /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <PreviewIcon /> Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default SideBar;
