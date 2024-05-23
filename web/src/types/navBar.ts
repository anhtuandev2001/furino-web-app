import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';

interface linksModal {
  id: number;
  name: string;
  path: string;
  icon?: any;
}

export const links: linksModal[] = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    id: 2,
    name: 'Shop',
    path: '/shop',
    icon: StoreIcon,
  },
  {
    id: 3,
    name: 'Contact',
    path: '/contact',
    icon: InfoIcon,
  },
  {
    id: 4,
    name: 'Notification',
    path: '/notification',
    icon: NotificationsIcon,
  },
  {
    id: 5,
    name: 'User',
    path: '/user',
    icon: ContactEmergencyIcon,
  },
];
