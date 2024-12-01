// all_events.js
import e4_tech from "./e4_tech.jpeg";
import e6_tech from "./e6.png";
import e7_cul from "./e7_cul.jpeg";
import e8_cul from "./e8_cul.jpeg";
import e9_cul from "./e9_cul.jpeg";
import e10_sports from "./e10_sport.jpeg";
import e11_sports from "./e11_sports.jpeg";
import e12_sports from "./e12_sports.png";
import e14_compe from "./e14_compe.jpeg";
import e15_compe from "./e15_compe.jpeg";
import e16_compe from "./e16_compe.png";
import e19_tech from "./e19_tech.jpeg";
import e20_tech from "./e20_tech.jpeg";
import e21_compe from "./e21_compe.jpeg";
import e22_sports from "./e22_sports.jpeg"
import e23_cul from "./e23_cul.jpeg"

import basket_icon from './basket_icon.png';
import logo from "./footer_logo.jpeg";
import header_img from "./hero_img.jpg";
import search_icon from './search_icon.png';

import add_icon_white from './add_icon_white.png';
import add_icon_green from './add_icon_green.png';
import remove_icon_red from './remove_icon_red.png';
import app_store from './app_store.png';
import play_store from './play_store.png';
import linkedin_icon from './linkedin_icon.png';
import facebook_icon from './facebook_icon.png';
import twitter_icon from './twitter_icon.png';
import cross_icon from './cross_icon.png';
import selector_icon from './selector_icon.png';
import rating_stars from "./wishlisticon.png"
import profile_icon from './profile_icon.png';
import bag_icon from './bag_icon.png';
import logout_icon from './logout_icon.png';
import parcel_icon from './parcel_icon.png';
import wishlist_icon from "./wishlisticon.png" // Renamed for consistency

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_stars, // Updated variable name
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    wishlist_icon
};

export const all_events = [
  {
    id: 1,
    name: "Cultural Dance Event",
    description: "This is a fully cultured event featuring dance performances.",
    category: "Cultural",
    image: e7_cul,
    old_booking_price: 200,
    new_booking_price: 100,
  },
  {
    id: 2,
    name: "Cultural Music Fest",
    description: "Experience various traditional music performances.",
    category: "Cultural",
    image: e8_cul,
    old_booking_price: 250,
    new_booking_price: 150,
  },
  {
    id: 3,
    name: "Cultural Art Exhibition",
    description: "An exhibition showcasing beautiful artwork from diverse cultures.",
    category: "Cultural",
    image: e9_cul,
    old_booking_price: 180,
    new_booking_price: 90,
  },
  {
    id: 4,
    name: "Sports Marathon",
    description: "Join the annual marathon event and test your endurance.",
    category: "Sports",
    image: e10_sports,
    old_booking_price: 300,
    new_booking_price: 200,
  },
  {
    id: 5,
    name: "Football Championship",
    description: "Watch the thrilling football championship event.",
    category: "Sports",
    image: e11_sports,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 6,
    name: "Basketball Tournament",
    description: "Join the exciting basketball tournament.",
    category: "Sports",
    image: e12_sports,
    old_booking_price: 350,
    new_booking_price: 175,
  },
  {
    id: 7,
    name: "Tech Conference 2024",
    description: "A conference on the latest trends in technology.",
    category: "Technical",
    image: e4_tech,
    old_booking_price: 500,
    new_booking_price: 350,
  },
  {
    id: 8,
    name: "AI Workshop",
    description: "A hands-on workshop on artificial intelligence and machine learning.",
    category: "Technical",
    image: e20_tech,
    old_booking_price: 450,
    new_booking_price: 300,
  },
  {
    id: 9,
    name: "Cybersecurity Seminar",
    description: "Learn about the latest in cybersecurity trends and techniques.",
    category: "Technical",
    image: e6_tech,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 10,
    name: "Video Making Competition", // Corrected typo
    description: "Participate in creating engaging and creative videos.",
    category: "Competition",
    image: e16_compe,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 11,
    name: "Rangoli Making Competition",
    description: "Showcase your creativity in designing beautiful Rangoli patterns.",
    category: "Competition",
    image: e15_compe,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 12,
    name: "Poster Making",
    description: "Express your artistic skills in our poster making contest.",
    category: "Competition",
    image: e14_compe,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 13,
    name: "AI Webinar",
    description: "Exclusive AI workshop for Introducing New Technologies.",
    category: "Technical",
    image: e19_tech,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 14,
    name: "Dance Competition",
    description: "Exclusive and Biggest ever Dance Competition .",
    category: "Competition",
    image: e21_compe,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 15,
    name: "Dusara Festival",
    description: "Exclusive and Biggest ever Dasara Festival in Maharashtra.",
    category: "Cultural",
    image: e23_cul,
    old_booking_price: 400,
    new_booking_price: 250,
  },
  {
    id: 16,
    name: "Cricket Marathon",
    description: "Join the annual marathon event and test your endurance.",
    category: "Sports",
    image: e22_sports,
    old_booking_price: 300,
    new_booking_price: 200,
  },
];
