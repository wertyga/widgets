const targets = {
    en: 'Refill user account',
    ru: 'Пополнение счета',
};
const formcomment = {
    en: 'Refill user account on "W-widgets"',
    ru: 'Пополнение счета в "W-widgets"',
};

export const yandex_secret = '38D23723D93C5C3944655E83E08B3ADD54EE635B6B0CC72C206F4ED6B4D92629';

export const yandexData = ({ lang, type, sum }) => ({
    // secret: '38D23723D93C5C3944655E83E08B3ADD54EE635B6B0CC72C206F4ED6B4D92629',
    receiver: '410018627231304',
    'quickpay-form': 'shop',
    targets: targets[lang],
    paymentType: type,
    sum,
    formcomment: formcomment[lang],
});

export const payPalOptions = {
  clientID: process.env.NODE_ENV !== 'production' ?
    'AckUxbeOS_kT27Uo9UtCvQZVmqSxFNJ8MrcIp6QFSpp5IOVeaeYD_TEp4Wg5wctD010YIAAYd3z_1hkV' :
    'Abt_SHTSjBTi01B32qYThNdOL6j-oCi0uIYIAZPwGUFNBlNzYn0HgevVRZkHBvO8vE4MtYjjgVB6Ey2u',
  secret: process.env.NODE_ENV !== 'production' ?
    'ED7uR-eA2WtMxm0rAdaGD8ojZFFUH0SY1CIHLvrD4-xzzrPsu1GeGBw_BGmgGDek8nMXiiMpMYe6v1tr' :
    'EFoF34ZfidbC0OlBlDP3pdjSsWB6HqyefbNk12y1MYndvZNFyVug7VocPDjvVwQb4J4rNIM6LY8s_ybW',
  brand_name: 'W-widgets',
};
