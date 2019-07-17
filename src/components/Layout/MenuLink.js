import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/** wrapper for router link in drawer */

const Link = React.forwardRef((props, ref) => <RouterLink {...props} innerRef={ref} />);

export default function MenuLink(props) {
  const { primary, to, icon, handleMenuClick } = props;
  return (
    <li>
      <ListItem button component={Link} to={to} onClick={handleMenuClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}