import { bedroom, living, dining, product1 } from '../../assets/images';

interface SuggestModal {
  id: number;
  image: string;
  title: string;
  category: string;
  link: string;
}

export const data: SuggestModal[] = [
  {
    id: 1,
    image: bedroom,
    title: 'Inner Peace',
    category: 'Bed Room',
    link: '/shop',
  },
  {
    id: 2,
    image: living,
    title: 'Comfort Zone',
    category: 'Living Room',
    link: '/shop',
  },
  {
    id: 3,
    image: dining,
    title: 'Culinary Space',
    category: 'Kitchen',
    link: '/shop',
  },
  {
    id: 4,
    image: product1,
    title: 'Work Mode',
    category: 'Office',
    link: '/shop',
  },
];
