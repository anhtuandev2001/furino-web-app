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
    title: 'Inner',
    category: 'Bed Room',
    link: '/shop',
  },
  {
    id: 2,
    image: living,
    title: 'Comfort',
    category: 'Living Room',
    link: '/shop',
  },
  {
    id: 3,
    image: dining,
    title: 'Culinary',
    category: 'Kitchen',
    link: '/shop',
  },
  {
    id: 4,
    image: product1,
    title: 'Work',
    category: 'Office',
    link: '/shop',
  },
];
