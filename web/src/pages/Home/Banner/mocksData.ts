import { banner } from '../../../assets/images';

interface BannerModal {
  id: number;
  image: string;
  title: string;
  supTitle: string;
  description: string;
  link: string;
}

export const data: BannerModal[] = [
  {
    id: 1,
    image: banner,
    title: 'Discover Our New Collection',
    supTitle: 'New Arrival',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    link: '/shop',
  },
  {
    id: 2,
    image: banner,
    title: 'Discover Our New Collection',
    supTitle: 'New Arrival',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    link: '/shop',
  },
  {
    id: 3,
    image: banner,
    title: 'Discover Our New Collection',
    supTitle: 'New Arrival',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    link: '/shop',
  },
];
