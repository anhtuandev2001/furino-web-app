import { bedroom } from '../../assets/images';

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
        image: bedroom,
        title: 'Inner Peace',
        category: 'Bed Room',
        link: '/shop',
    },
    {
        id: 3,
        image: bedroom,
        title: 'Inner Peace',
        category: 'Bed Room',
        link: '/shop',
    },
    {
        id: 4,
        image: bedroom,
        title: 'Inner Peace',
        category: 'Bed Room',
        link: '/shop',
    },
];
