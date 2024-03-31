import hope from '../img/blocks-img/hope.png';
import hope2x from '../img/blocks-img/hope@2x.png';
import children from '../img/blocks-img/children.png';
import children2x from '../img/blocks-img/children@2x.png';
import hunger from '../img/blocks-img/hunger.png';
import hunger2x from '../img/blocks-img/hunger@2x.png';
import razom from '../img/blocks-img/razom.png';
import razom2x from '../img/blocks-img/razom@2x.png';
import prytula from '../img/blocks-img/prytula.png';
import prytula2x from '../img/blocks-img/prytula@2x.png';
import medical from '../img/blocks-img/medical.png';
import medical2x from '../img/blocks-img/medical@2x.png';
import united from '../img/blocks-img/united.png';
import united2x from '../img/blocks-img/united@2x.png';
import world from '../img/blocks-img/world.png';
import world2x from '../img/blocks-img/world@2x.png';
import group from '../img/blocks-img/group.png';
import group2x from '../img/blocks-img/group@2x.png';
const charityFunds = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: children,
    retinaImg: children2x,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: hope,
    retinaImg: hope2x,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: group,
    retinaImg: group2x,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: razom,
    retinaImg: razom2x,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: hunger,
    retinaImg: hunger2x,
  },
  {
    title: 'Sergiy Prytula Charity   Foundation',
    url: 'https://prytulafoundation.org/en',
    img: prytula,
    retinaImg: prytula2x,
  },
  {
    title: 'Medicins Sans   Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: medical,
    retinaImg: medical2x,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: united,
    retinaImg: united2x,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: world,
    retinaImg: world2x,
  },
];

import Swiper from 'swiper';
import 'swiper/css';

const charityElem = document.querySelector('.swiper-wrapper');
const swiperBtnElem = document.querySelector('.support-swiper-btn');
const arrowElem = document.querySelector('.swiper-button-icon');

swiperBtnElem.addEventListener('click', onBtnClick);

export function fundsMarkup() {
  const result = charityFunds
    .map(({ title, url, img }, index) => {
      const paddedIndex = (index + 1).toString().padStart(2, '0');
      return `<div class="swiper-slide ">
      <a class="support-funds-link" href="${url}" target="_blank"
                    rel="noopener noreferrer nofollow">
      <p class="support-fund-number">${paddedIndex}</p>
                <img class="support-funds-list-link-image" src="${img}"
                    alt="${title}"
            </a></div>`;
    })
    .join('');
  charityElem.innerHTML = result;
}
fundsMarkup();

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: false,
  effect: 'slide',
  slidesPerView: 6,
  slidesPerGroup: 6,
});
swiper.on('reachBeginning', function () {
  arrowElem.style.transform = '';
});
swiper.on('reachEnd', function () {
  arrowElem.style.transform = 'rotate(180deg)';
});

export function onBtnClick(e) {
  if (arrowElem.style.transform == '') {
    swiper.slideNext(2000);
  } else {
    swiper.slidePrev(2000);
  }
}