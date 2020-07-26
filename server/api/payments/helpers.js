import axios from 'axios';
import url from 'url';
import PayPal from 'w-paypal';
import { yandex_secret, payPalOptions } from 'server/config/payments';

export const payPalInstance = new PayPal(payPalOptions);

export const yandexQuickPay = async (data) => {
    const res = await axios({
        method: 'post',
        url: 'https://money.yandex.ru/quickpay/confirm.xml',
        data: yandexData(data),
    });
    console.log(res);
};

export const yandexAuth = async () => {
    const params = new url.URLSearchParams({
        client_id: yandex_secret,
        response_type: 'code',
        scope: 'account-info operation-history',
        redirect_uri: 'http://localhost:3000',
    });
    const res = await axios.post('https://money.yandex.ru/oauth/authorize', params);
    console.log(res);
};

export const checkoutPayPal = async ({ sum }) => {
  const { approveHref } = await payPalInstance.sendPayment({ amount: sum });
  console.log(approveHref);
};
