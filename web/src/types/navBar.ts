import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

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
      name: 'User',
      path: '/user',
      icon: ContactEmergencyIcon,
    },
  ];
  