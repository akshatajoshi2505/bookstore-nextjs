import google from 'next-auth/providers/google';
import { useEffect, useState } from 'react';

interface PaymentsClient {
    isReadyToPay(request: IsReadyToPayRequest): Promise<IsReadyToPayResponse>;
    createButton(options: ButtonOptions): HTMLElement;
    prefetchPaymentData(paymentDataRequest: PaymentDataRequest): void;
    loadPaymentData(paymentDataRequest: PaymentDataRequest): Promise<PaymentData>;
}

interface IsReadyToPayRequest {
    apiVersion: number;
    apiVersionMinor: number;
    allowedPaymentMethods: object[];
}

interface IsReadyToPayResponse {
    result: boolean;
}

interface ButtonOptions {
    onClick: () => void;
    allowedPaymentMethods: object[];
}

interface PaymentDataRequest {
    apiVersion: number;
    apiVersionMinor: number;
    allowedPaymentMethods: object[];
    transactionInfo?: TransactionInfo;
    merchantInfo?: MerchantInfo;
}

interface TransactionInfo {
    countryCode: string;
    currencyCode: string;
    totalPriceStatus: string;
    totalPrice: string;
}

interface MerchantInfo {
    merchantName: string;
}

interface PaymentData {
    paymentMethodData: {
        tokenizationData: {
        token: string;
        };
    };
}

const GooglepayComponent: React.FC = () => {
    const baseRequest: PaymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [],
    };

    const allowedCardNetworks = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'];

    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    const tokenizationSpecification = {
        type: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
        },
    };

    const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
            allowedAuthMethods: allowedCardAuthMethods,
            allowedCardNetworks: allowedCardNetworks,
        },
    };

    const cardPaymentMethod = {
        ...baseCardPaymentMethod,
        tokenizationSpecification: tokenizationSpecification,
    };

    const [paymentsClient, setPaymentsClient] = useState<PaymentsClient | null>(null);

    useEffect(() => {
        const initializePaymentsClient = () => {
            const client = new (window as any).google.payments.api.PaymentsClient({ environment: 'TEST' });
            setPaymentsClient(client);
            client.isReadyToPay(getGoogleIsReadyToPayRequest())
            .then((response: { result: any; }) => {
                if (response.result) {
                addGooglePayButton(client);
                }
            })
            .catch((err: any) => console.error(err));
        };

        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.async = true;
        script.onload = initializePaymentsClient;
        document.body.appendChild(script);
    }, []);

    const getGoogleIsReadyToPayRequest = (): IsReadyToPayRequest => ({
        ...baseRequest,
        allowedPaymentMethods: [baseCardPaymentMethod],
    });

    const getGooglePaymentDataRequest = (): PaymentDataRequest => {
        const paymentDataRequest = { ...baseRequest };
        paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
        paymentDataRequest.merchantInfo = {
            merchantName: 'Example Merchant',
        };
        return paymentDataRequest;
    };
    const getGoogleTransactionInfo = (): TransactionInfo => ({
        countryCode: 'US',
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
        totalPrice: '1.00',
    });
    const addGooglePayButton = (client: PaymentsClient) => {
        const button = client.createButton({
            onClick: onGooglePaymentButtonClicked,
            allowedPaymentMethods: [baseCardPaymentMethod],
        });
        document.getElementById('container')?.appendChild(button);
    };

    const onGooglePaymentButtonClicked = () => {
        const paymentDataRequest = getGooglePaymentDataRequest();
        paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

        paymentsClient?.loadPaymentData(paymentDataRequest)
        .then((paymentData) => {
            processPayment(paymentData);
        })
        .catch((err) => console.error(err));
    };

    const processPayment = (paymentData: PaymentData) => {
        console.log(paymentData);
        const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    };

    return <div id="container"></div>;
};
export default GooglepayComponent;