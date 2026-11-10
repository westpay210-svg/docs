import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {PageHeader} from '../components/docs/PageHeader';
import {PropertyTable} from '../components/docs/PropertyTable';
import {Callout} from '../components/docs/Callout';
import {CodeBlock} from '../components/code/CodeBlock';

export const WalletCharge: React.FC = () => {
    const requestParameters = [
        {name: 'amount', type: 'int', required: true, description: 'The transaction amount. (in cents format e.g "1000" is 10 USD)'},
        {name: 'email', type: 'string', required: true, description: 'The email address of the customer/cardholder.'},
        {name: 'currency', type: 'string', required: false, description: 'The transaction currency. Supported values: NGN, GHS, ZAR, USD. Defaults to your integration\'s primary currency.'},
        {name: 'reference', type: 'string', required: true, description: 'A unique reference for the transaction. Only alphanumeric characters, \'.\', \'-\', and \'=\' are allowed.'},
        {name: 'callbackUrl', type: 'string', required: true, description: 'A fully qualified URL to override the callback URL set on your dashboard for this transaction. Must start with http or https.'},
        {name: 'webhookUrl', type: 'string', required: false, description: 'Custom webhook URL for notifications. Must start with http or https to be valid.'},
        {name: 'bearer', type: 'int', required: false, description: 'Who bears the transaction fee (1 = merchant, 2 = customer).'},
        {name: 'processor', type: 'string', required: true, description: 'The wallet processor to route this transaction to. One of: APPLEPAY, OPAY, PALMPAY.'},
        {name: 'cardTrustLevel', type: 'string', required: false, description: 'Trust level for transaction processing. Defaults to TRUSTED.'},
        {name: 'browserDetails', type: 'object', required: false, description: 'Detailed information about the payer\'s browser. When provided, increases the transaction success rate.'},
        {name: 'customer', type: 'object', required: false, description: 'Detailed information on the customer making the payment. Used by the ApplePay processor; ignored by OPay and PalmPay.'},
        {name: 'tid', type: 'string', required: false, description: 'Terminal ID (TID). Uniquely identifies a specific payment terminal, virtual endpoint, or logical channel under a merchant account (MID).'},
        {name: 'sourceUrl', type: 'string', required: false, description: 'The originating URL.'}
    ];

    const customerParameters = [
        {name: 'email', type: 'string', required: false, description: 'The customer\'s email address.'},
        {name: 'firstName', type: 'string', required: false, description: 'The payer\'s first name.'},
        {name: 'lastName', type: 'string', required: false, description: 'The payer\'s last name.'},
        {name: 'phoneNumber', type: 'string', required: false, description: 'The payer\'s phone number.'},
        {name: 'dateOfBirth', type: 'string', required: false, description: 'The payer\'s date of birth, in yyyy-mm-dd format.'},
        {name: 'address', type: 'object', required: false, description: 'Billing address (city, company, country, postcodeZip, stateProvince, stateProvinceCode, street).'}
    ];

    const responseFields = [
        {name: 'status', type: 'int', description: 'HTTP status code.'},
        {name: 'message', type: 'string', description: 'Transaction response message.'},
        {name: 'data', type: 'object', description: 'The transaction response data.'},
        {name: 'data.status', type: 'int', description: 'Authentication status code for the wallet transaction.'},
        {name: 'authorizationType', type: 'string', description: 'The authorization type used: SAF for ApplePay, or 3DS for OPay/PalmPay redirect checkout.'},
        {name: 'acsUrl', type: 'string', description: 'The URL to which the customer must be redirected to complete the wallet payment.'},
        {name: 'reference', type: 'string', description: 'A unique reference for the transaction, used to track the payment process.'},
        {name: 'errorMessage', type: 'string', description: 'Status/decline message (e.g. "Pending Authorization" while the redirect flow is in progress).'},
        {name: 'orderStatus', type: 'string', description: 'The order status reported by the processor. Returned for ApplePay transactions.'},
        {name: 'errors', type: 'array', description: 'A list of errors, if any.'}
    ];

    const errorCodes = [
        {code: '400', message: 'Invalid Request', description: 'Missing or invalid parameters, or the terminal (tid) is not active.'},
        {code: '404', message: 'Not Found', description: 'The payment transaction associated with the request could not be found.'},
        {code: '500', message: 'Server Error', description: 'No eligible payment descriptor was found for the processor, or the processor request failed.'}
    ];

    const requestBodyJson = `{
    "amount": 10000,
    "email": "john.wick@westrapay",
    "currency": "USD",
    "reference": "000045mG7mTL022NzzQ0",
    "callbackUrl": "https://example.com/",
    "webhookUrl": "https://example.com/",
    "bearer": 1,
    "processor": "APPLEPAY",
    "cardTrustLevel": "TRUSTED",
    "browserDetails": {
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "language": "en-US",
        "javaEnabled": true,
        "colorDepth": 24,
        "screenHeight": 1080,
        "screenWidth": 1920,
        "timeZone": -60,
        "javaScriptEnabled": true,
        "ipAddress": "192.168.1.1"
    },
    "customer": {
        "email": "john.wick@westrapay",
        "firstName": "John",
        "lastName": "Wick",
        "phoneNumber": "+2347064332071",
        "dateOfBirth": "1990-01-05",
        "address": {
            "city": "Rome",
            "postcodeZip": "00184",
            "country": "IT",
            "street": "Via Cavour 21",
            "stateProvinceCode": "DE"
        }
    },
    "tid": "TT9GMG",
    "sourceUrl": "https://sourceexample.com"
}`;

    const successResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "status": 200,
        "authorizationType": "SAF",
        "acsUrl": "https://sandbox-checkout.westrapay.com/acs/CaW8K1xydcE5v24f_xEt",
        "reference": "CaW8K1xydcE5v24f_xEt",
        "errorMessage": "PENDING",
        "orderStatus": "PENDING"
    },
    "errors": []
}`;

    const opayPalmpaySuccessResponseJson = `{
    "status": 200,
    "message": "Request successfully processed",
    "data": {
        "status": 200,
        "authorizationType": "3DS",
        "acsUrl": "https://sandbox-checkout.westrapay.com/acs/CaW8K1xydcE5v24f_xEt",
        "reference": "CaW8K1xydcE5v24f_xEt",
        "errorMessage": "Pending Authorization"
    },
    "errors": []
}`;

    return (
        <div className="max-w-4xl">
            <PageHeader
                label="Server to Server"
                title="ApplePay / OPay / PalmPay"
                description="Initialize a server-to-server wallet transaction for ApplePay, OPay, or PalmPay, selected via the processor field. Google Pay is not currently supported."
            />

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Endpoint</h2>
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded font-mono text-[13px] mb-4">
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded">POST</span>
                    <code className="text-slate-700">/wallet/charge</code>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Request Parameters</h2>
                <PropertyTable properties={requestParameters}/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">customer Object</h2>
                <PropertyTable properties={customerParameters} showRequired={false}/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Headers</h2>
                <CodeBlock code="Content-Type: application/json" language="bash"/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Request Body</h2>
                <CodeBlock code={requestBodyJson} language="json"/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Response Fields</h2>
                <PropertyTable properties={responseFields} showRequired={false}/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response &mdash; processor: APPLEPAY</h2>
                <CodeBlock code={successResponseJson} language="json"/>
            </div>

            <div className="mb-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Success Response &mdash; processor: OPAY / PALMPAY</h2>
                <CodeBlock code={opayPalmpaySuccessResponseJson} language="json"/>
            </div>

            <Callout type="warning" title="Redirect required">
                Redirect the customer to <code>acsUrl</code> to complete the wallet payment. This request requires your
                merchant private key in the <code>Authorization</code> header, the same as the other Server to Server
                charge endpoints.
            </Callout>

            <div className="mb-8 mt-8">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Error Responses</h2>
                <div className="border border-slate-200 rounded overflow-hidden my-4">
                    <table className="w-full text-[13px]">
                        <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                            <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                            <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                        {errorCodes.map((e, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-mono text-[13px] text-red-600">{e.code}</td>
                                <td className="px-4 py-3 text-[13px] text-slate-700">{e.message}</td>
                                <td className="px-4 py-3 text-[13px] text-slate-500">{e.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-10">
                <span className="text-[13px] text-slate-500">Next in Server to Server</span>
                <Link to="/server-to-server/verify-transaction-status"
                      className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-kiwi-700 bg-kiwi-50 border border-kiwi-200 rounded hover:bg-kiwi-100 transition-colors">
                    Verify Transaction Status <ArrowRight className="h-3.5 w-3.5"/>
                </Link>
            </div>
        </div>
    );
};
