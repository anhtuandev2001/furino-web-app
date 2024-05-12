import { dining, bedroom, living } from '../../assets/images';

interface CategoryModal {
  id: number;
  image: string;
  title: string;
  link: string;
}

export const data: CategoryModal[] = [
  {
    id: 1,
    image: dining,
    title: 'Dinning',
    link: '/shop',
  },
  {
    id: 2,
    image: bedroom,
    title: 'Bedroom',
    link: '/shop',
  },
  {
    id: 3,
    image: living,
    title: 'Living',
    link: '/shop',
  },
];
