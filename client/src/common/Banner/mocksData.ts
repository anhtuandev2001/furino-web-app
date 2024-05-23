import { banner, backgroundShop1, backgroundShop2 } from '../../assets/images';

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
    image: backgroundShop1,
    title: 'Explore Our Summer Collection',
    supTitle: 'Summer Special',
    description:
      'Dive into our exclusive summer collection. Ut elit tellus, luctus nec ullamcorper mattis.',
    link: '/shop',
  },
  {
    id: 3,
    image: backgroundShop2,
    title: 'Unveiling Our Winter Collection',
    supTitle: 'Winter Arrival',
    description:
      'Get ready for winter with our new collection. Ut elit tellus, luctus nec ullamcorper mattis.',
    link: '/shop',
  },
];