import { MdEmail } from 'react-icons/md';
import { IoTimeSharp } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export const list = [
  {
    icon: FaLocationDot,
    name: 'Address',
    content: '236 5th SE Avenue, New York NY10000, United States',
  },
  {
    icon: FaPhoneAlt,
    name: 'Phone',
    content: '+1 234 567 890',
  },
  {
    icon: MdEmail,
    name: 'Email',
    content: 'furino@gmail.com',
  },
  {
    icon: IoTimeSharp,
    name: 'Working Time',
    content: 'Monday-Friday: 9:00 - 22:00 \nSaturday-Sunday: 9:00 - 21:00',
  },
];
