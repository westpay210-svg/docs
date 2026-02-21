import { ApiEndpoint } from "../types/docs.types";

export const authenticationEndpoint: ApiEndpoint = {
  id: "generate-access-token",
  title: "Generate Access Token",
  method: "GET",
  url: "{authUrl}/api/uaa/api/auth",
  description:
    "Generate an access token using your API key and client ID. This token is required for all subsequent API calls.",
  parameters: [
    {
      name: "x-api-key",
      type: "string",
      required: true,
      location: "header",
      description: "Your API key provided by Kiwi Finance",
      example: "your-api-key-here",
    },
    {
      name: "x-client-id",
      type: "string",
      required: true,
      location: "header",
      description: "Your client ID provided by Kiwi Finance",
      example: "your-client-id-here",
    },
  ],
  responses: [
    {
      status: 200,
      description: "Successfully generated access token",
      example: {
        accessToken: "eyJhbGciOiJSUzI1NiJ9...",
        refreshToken: "eyJhbGciOiJSUzI1NiJ9...",
        user: {
          id: "0d2d8b3a-f16e-46f9-905e-0f9f30f66c64",
          mobile: null,
          firstName: "John",
          lastName: "Doe",
          role: "BUSINESS",
          roles: ["BUSINESS"],
          kycLevel: "TIER_THREE",
          selfie: "https://akumfb.blob.core.windows.net/selfies/null",
          accountPublicId: "507eddca-5edc-4b67-b3a9-cca071a02d5d",
        },
        properties: [
          {
            name: "EMAIL_VALIDATED_DATE",
            value: "2024-08-06T11:03:56.839206850",
          },
        ],
      },
    },
    {
      status: 401,
      description: "Invalid credentials",
      example: {
        error: "Unauthorized",
        message: "Invalid API key or client ID",
      },
    },
  ],
  codeExamples: [
    {
      language: "curl",
      code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/uaa/api/auth \\
  --header 'x-api-key: your-api-key-here' \\
  --header 'x-client-id: your-client-id-here'`,
    },
    {
      language: "javascript",
      code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/uaa/api/auth', {
  method: 'GET',
  headers: {
    'x-api-key': 'your-api-key-here',
    'x-client-id': 'your-client-id-here'
  }
});

const data = await response.json();
console.log(data.accessToken);`,
    },
    {
      language: "python",
      code: `import requests

url = "https://staging.api.kiwifinance.tech/api/uaa/api/auth"
headers = {
    "x-api-key": "your-api-key-here",
    "x-client-id": "your-client-id-here"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data['accessToken'])`,
    },
  ],
};

export const virtualAccountsEndpoints: ApiEndpoint[] = [
  {
    id: "create-reserved-individual",
    title: "Create Reserved Virtual Account - Individual",
    method: "POST",
    url: "{baseUrl}/business/account/v2/reserve-account/requests",
    description:
      "Create a reserved virtual account for an individual customer. This account is permanently linked and can be used for multiple transactions.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    requestBody: {
      type: "application/json",
      description: "Individual account details",
      schema: {},
      example: {
        requestId: "CRA1909031093131311",
        firstname: "Vicky",
        middlename: "Andor",
        lastname: "Doe",
        mobile: "08078787754",
        dob: "2000-07-27",
        bvn: "22222222226",
      },
    },
    responses: [
      {
        status: 200,
        description: "Account created successfully",
        example: {
          requestId: "CRA1909031093131311",
          accountName: "Vicky Doe - Example Inc",
          type: "RESERVE",
          accountNumber: "9066370955",
          status: "ACTIVE",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request POST \\
  --url https://staging.api.kiwifinance.tech/api/paas/business/account/v2/reserve-account/requests \\
  --header 'Authorization: Bearer your-access-token' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "requestId": "CRA1909031093131311",
    "firstname": "Vicky",
    "middlename": "Andor",
    "lastname": "Doe",
    "mobile": "08078787754",
    "dob": "2000-07-27",
    "bvn": "22222222226"
  }'`,
      },
      {
        language: "javascript",
        code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/paas/business/account/v2/reserve-account/requests', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-access-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    requestId: 'CRA1909031093131311',
    firstname: 'Vicky',
    middlename: 'Andor',
    lastname: 'Doe',
    mobile: '08078787754',
    dob: '2000-07-27',
    bvn: '22222222226'
  })
});

const data = await response.json();
console.log(data);`,
      },
    ],
  },
  {
    id: "create-reserved-corporate",
    title: "Create Reserved Virtual Account - Corporate",
    method: "POST",
    url: "{baseUrl}/business/account/v2/reserve-account/requests/company",
    description:
      "Create a reserved virtual account for a corporate customer. This account is permanently linked to the business entity.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    requestBody: {
      type: "multipart/form-data",
      description: "Corporate account details with document upload",
      schema: {},
      example: {
        file: "Document file (PDF, PNG, JPG)",
        requestId: "444444445567743",
        companyName: "Example Inc",
        mobile: "+2348179338262",
      },
    },
    responses: [
      {
        status: 200,
        description: "Corporate account created successfully",
        example: {
          requestId: "e9baf260-557d-43cb-84e5-412bb63b13ce",
          accountName: "Example Inc - polarbit 04",
          type: "RESERVE",
          accountNumber: "9065343240",
          status: "ACTIVE",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/business/account/v2/reserve-account/requests/company' \\
  --header 'accept: */*' \\
  --header 'Authorization: Bearer your-access-token' \\
  --form 'file=@"/path/to/your/document.pdf"' \\
  --form 'requestId="444444445567743"' \\
  --form 'companyName="Example Inc"' \\
  --form 'mobile="+2348179338262"'`,
      },
    ],
  },
  {
    id: "create-temporary-static",
    title: "Create Temporary Static Virtual Account",
    method: "POST",
    url: "{baseUrl}/business/account/v2/virtual-account/requests",
    description:
      "Create a temporary virtual account with a fixed amount. Perfect for one-time payments.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    requestBody: {
      type: "application/json",
      description: "Temporary account details with fixed amount",
      schema: {},
      example: {
        amount: "500",
        requestId: "VEGS328H939003193298",
      },
    },
    responses: [
      {
        status: 200,
        description: "Temporary account created successfully",
        example: {
          accountName: "Tony Soprano - Aku MFB",
          amount: 500,
          description: "",
          paymentRequestId: "a335309f-a814-47de-b0d6-cd273ca56f1e",
          accountNumber: "2002405357",
          status: "PENDING",
          accountNumberExpiry: "2025-08-06T16:04:00.052953974",
          requestId: "VEGS328H939003193298",
          institutionName: "Aku MFB",
          institutionCode: "090531",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request POST \\
  --url https://staging.api.kiwifinance.tech/api/paas/business/account/v2/virtual-account/requests \\
  --header 'Authorization: Bearer your-access-token' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "amount": "500",
    "requestId": "VEGS328H939003193298"
  }'`,
      },
      {
        language: "javascript",
        code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/paas/business/account/v2/virtual-account/requests', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-access-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: '500',
    requestId: 'VEGS328H939003193298'
  })
});

const data = await response.json();
console.log(data);`,
      },
    ],
  },
  {
    id: "fund-transfer-single-credit",
    title: "Fund Transfer Single Credit",
    method: "POST",
    url: "{baseUrl}/banking/test?name=fundTransferSingleCredit",
    description:
      "Transfer funds from a virtual or reserved account to a beneficiary account. Used by those who have created virtual or reserved accounts to send money.",
    parameters: [
      {
        name: "x-api-key",
        type: "string",
        required: true,
        location: "header",
        description: "Your API key provided by Kiwi Finance",
        example: "$apr1$0xpiuy83$80wyJVeTrN/UhcZuPA7pX.",
      },
    ],
    requestBody: {
      type: "application/json",
      description:
        "Fund transfer details including beneficiary and debitor information",
      schema: {},
      example: {
        beneficiaryAccountNumber: "09056153649",
        transactionAmount: "15000",
        beneficiaryName: "Jane Smith",
        beneficiaryBvn: "5555555555",
        debitorName: "John Doe",
        debitAccountNumber: "0123459789",
        debitorBvnNumber: "5555555555",
        transactionSessionId: "567439xx93903939977933",
        paymentReference: "t7r54rx454x55556444466o449",
        narration: "testing",
        fee: "10",
      },
    },
    responses: [
      {
        status: 200,
        description: "Fund transfer initiated successfully",
        example: {
          success: true,
          transactionId: "t7r54rx454x55556444466o449",
          status: "PENDING",
          message: "Transfer initiated successfully",
        },
      },
      {
        status: 400,
        description: "Invalid request parameters",
        example: {
          error: "Bad Request",
          message: "Invalid account number or insufficient funds",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/banking/test?name=fundTransferSingleCredit' \\
  --header 'x-api-key: your-api-key-here' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "beneficiaryAccountNumber": "09056153649",
    "transactionAmount": "15000",
    "beneficiaryName": "Jane Smith",
    "beneficiaryBvn": "5555555555",
    "debitorName": "John Doe",
    "debitAccountNumber": "0123459789",
    "debitorBvnNumber": "5555555555",
    "transactionSessionId": "567439xx93903939977933",
    "paymentReference": "t7r54rx454x55556444466o449",
    "narration": "testing",
    "fee": "10"
  }'`,
      },
      {
        language: "javascript",
        code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/paas/banking/test?name=fundTransferSingleCredit', {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    beneficiaryAccountNumber: '09056153649',
    transactionAmount: '15000',
    beneficiaryName: 'Jane Smith',
    beneficiaryBvn: '5555555555',
    debitorName: 'John Doe',
    debitAccountNumber: '0123459789',
    debitorBvnNumber: '5555555555',
    transactionSessionId: '567439xx93903939977933',
    paymentReference: 't7r54rx454x55556444466o449',
    narration: 'testing',
    fee: '10'
  })
});

const data = await response.json();
console.log(data);`,
      },
      {
        language: "python",
        code: `import requests

url = "https://staging.api.kiwifinance.tech/api/paas/banking/test?name=fundTransferSingleCredit"
headers = {
    "x-api-key": "your-api-key-here",
    "Content-Type": "application/json"
}

payload = {
    "beneficiaryAccountNumber": "09056153649",
    "transactionAmount": "15000",
    "beneficiaryName": "Jane Smith",
    "beneficiaryBvn": "5555555555",
    "debitorName": "John Doe",
    "debitAccountNumber": "0123459789",
    "debitorBvnNumber": "5555555555",
    "transactionSessionId": "567439xx93903939977933",
    "paymentReference": "t7r54rx454x55556444466o449",
    "narration": "testing",
    "fee": "10"
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()
print(data)`,
      },
    ],
  },
  {
    id: "reserve-account-transaction-status",
    title: "Get Reserve Account Transaction Status",
    method: "GET",
    url: "{baseUrl}/bank/transfer/v1/transfer-funds/status/reference/{originalReference}",
    description:
      "Check the transaction status for reserve account transfer using its original reference",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "originalReference",
        type: "string",
        required: true,
        location: "path",
        description: "The original reference of the transfer",
        example: "dc6c010c-8069-4cf3-8af4-65e3b4b06914",
      },
    ],
    responses: [
      {
        status: 200,
        description:
          "Reserve account transaction status retrieved successfully",
        example: {
          reference: "dc6c010c-8069-4cf3-8af4-65e3b4b06914",
          status: "COMPLETE",
          destination: "9005487656",
          destinationName: "John Doe - Example Inc",
          requestId: "dc6c010c-8069-4cf3-8af4-65e3b4b06914",
          responseCode: "00",
          responseMessage: "Transaction approved",
          amount: 3410.89,
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/transfer-funds/status/reference/dc6c010c-8069-4cf3-8af4-65e3b4b06914' \\
  --header 'Authorization: Bearer your-access-token'`,
      },
    ],
  },
  {
    id: "create-temporary-dynamic",
    title: "Create Temporary Dynamic Virtual Account",
    method: "POST",
    url: "{baseUrl}/business/account/v2/virtual-account/requests/dynamic",
    description:
      "Create a temporary virtual account that accepts flexible amount and multiple payments.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    requestBody: {
      type: "application/json",
      description: "Dynamic account configuration",
      schema: {},
      example: {
        amount: "100",
        requestId: "DVA2384932240968778782",
      },
    },
    responses: [
      {
        status: 200,
        description: "Dynamic account created successfully",
        example: {
          accountName: "John Doe - Aku MFB",
          amount: 100,
          description: "",
          paymentRequestId: "0b2fdfb2-3761-42db-a658-f4130e182420",
          accountNumber: "2075483256",
          status: "PENDING",
          accountNumberExpiry: "2024-12-26T14:29:14.170820251",
          requestId: "DVA2384932240968778782",
          institutionName: "Aku MFB",
          institutionCode: "090531",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/business/account/v2/virtual-account/requests/dynamic' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer your-access-token' \\
  --data '{
    "amount": "100",
    "requestId": "DVA2384932240968778782"
  }'`,
      },
    ],
  },
  {
    id: "static-transaction-status",
    title: "Get Temporary VA Transaction Status - Static",
    method: "GET",
    url: "{baseUrl}/business/account/v2/virtual-account/payment-status?requestId={requestId}",
    description:
      "Check the transaction status for payment into static virtual account using its request id",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "requestId",
        type: "string",
        required: true,
        location: "path",
        description: "The request ID of the virtual account",
        example: "VEGS328H939003193298",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Account status retrieved successfully",
        example: {
          requestId: "DVA238493224099",
          status: "COMPLETED",
          institutionCode: "000014",
          institution: "ACCESS BANK",
          externalReference: "000014250820144752175569767287",
          originalReference: "f50111eb-e77a-48b2-844c-28971ee9c5af",
          senderAccount: "0123456789",
          recipientAccount: "2010771123",
          amount: 500.0,
          type: "VIRTUAL_ACCOUNT",
          amountRequested: 500.0,
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/paas/business/account/v2/virtual-account/payment-status?requestId=DVA238493224099 \\
  --header 'Authorization: Bearer your-access-token'`,
      },
    ],
  },
  {
    id: "dynamic-transaction-status",
    title: "Get Temporary VA Transaction Status - Dynamic",
    method: "GET",
    url: "{baseUrl}/business/account/v2/virtual-account/payment-status/dynamic?requestId={requestId}",
    description:
      "Check the transaction status for payments into dynamic virtual account using its request id",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "requestId",
        type: "string",
        required: true,
        location: "query",
        description: "The request ID of the dynamic virtual account",
        example: "DVA238493224099",
      },
    ],
    responses: [
      {
        status: 200,
        description:
          "Dynamic account transaction status retrieved successfully",
        example: {
          requestId: "23884289428942424242",
          recipientAccount: "2064517522",
          status: "PENDING",
          type: "VIRTUAL_ACCOUNT",
          amountRequested: 1500,
          payments: [
            {
              payment: {
                ORIGINAL_REF: "f4ef11a8-cd46-4de5-8386-2aea8850be4b",
                INSTITUTION_CODE: "000014",
                SENDER_ACCOUNT_NUMBER: "0123456789",
                RECIPIENT_ACCOUNT_NUMBER: "2064517522",
                AMOUNT: "3000.00000000000",
                EXTERNAL_REF: "000014250429085829174591350958",
                INSTITUTION_NAME: "ACCESS BANK",
                STATUS: "COMPLETED",
                AMOUNT_REQUESTED: "1500.00",
              },
            },
            {
              payment: {
                INSTITUTION_CODE: "090531",
                ORIGINAL_REF: "edd54c96-3d75-4c0e-a406-26c9911dca11",
                SENDER_ACCOUNT_NUMBER: "5099196595",
                AMOUNT: "750.00",
                EXTERNAL_REF: "edd54c96-3d75-4c0e-a406-26c9911dca11",
                INSTITUTION_NAME: "Aku MFB",
                STATUS: "COMPLETED",
                AMOUNT_REQUESTED: "1500.00",
              },
            },
          ],
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/paas/business/account/v2/virtual-account/payment-status/dynamic?requestId=23884289428942424242 \\
  --header 'Authorization: Bearer your-access-token'`,
      },
    ],
  },
];

export const payoutsEndpoints: ApiEndpoint[] = [
  {
    id: "get-banks",
    title: "Get Bank List",
    method: "GET",
    url: "{baseUrl}/bank/transfer/v1/banks",
    description:
      "Retrieve a list of all supported banks for transfers. This includes bank codes, names, and logos.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    responses: [
      {
        status: 200,
        description: "List of supported banks",
        example: {
          content: [
            {
              id: "7e21fd55-f3f0-4c63-a4c9-61137cdd778f",
              code: "000016",
              name: "FIRST BANK OF NIGERIA",
              logoUrl:
                "https://akumfb.blob.core.windows.net/assets/ASSET/7e21fd55-f3f0-4c63-a4c9-61137cdd778f.svg",
            },
            {
              id: "0a76ed31-2a96-4cf2-9186-231f404ffdcb",
              code: "000013",
              name: "GTBANK PLC",
              logoUrl:
                "https://akumfb.blob.core.windows.net/assets/ASSET/0a76ed31-2a96-4cf2-9186-231f404ffdcb.svg",
            },
          ],
          totalElements: 570,
          totalPages: 1,
          size: 570,
          number: 0,
          first: true,
          last: true,
          empty: false,
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/banks \\
  --header 'Authorization: Bearer your-access-token'`,
      },
      {
        language: "javascript",
        code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/banks', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-access-token'
  }
});

const data = await response.json();
console.log(data.content); // Array of banks`,
      },
    ],
  },
  {
    id: "name-enquiry",
    title: "Name Enquiry",
    method: "GET",
    url: "{baseUrl}/bank/transfer/v1/banks/code/{bankCode}/accounts/account-number/{accountNumber}/name",
    description:
      "Verify account details before initiating a transfer. Returns the account holder name for the given account number and bank.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "bankCode",
        type: "string",
        required: true,
        location: "path",
        description: "Bank code from the banks list",
        example: "000023",
      },
      {
        name: "accountNumber",
        type: "string",
        required: true,
        location: "path",
        description: "10-digit account number",
        example: "0164524367",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Account name resolved successfully",
        example: {
          bank: "000023",
          accountNumber: "0164524367",
          name: "JANE NKANOR",
        },
      },
      {
        status: 404,
        description: "Account not found",
        example: {
          error: "Account not found",
          message: "The specified account number does not exist",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/banks/code/000023/accounts/account-number/0164524367/name \\
  --header 'Authorization: Bearer your-access-token'`,
      },
      {
        language: "javascript",
        code: `const bankCode = '000023';
const accountNumber = '0164524367';

const response = await fetch(\`https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/banks/code/\${bankCode}/accounts/account-number/\${accountNumber}/name\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-access-token'
  }
});

const data = await response.json();
console.log(data.name); // Account holder name`,
      },
    ],
  },
  {
    id: "initiate-transfer",
    title: "Initiate Transfer",
    method: "POST",
    url: "{baseUrl}/bank/transfer/v1/transfer-funds",
    description:
      "Send money to a bank account. The transfer can be processed immediately or queued based on your account settings.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
    ],
    requestBody: {
      type: "application/json",
      description: "Transfer details",
      schema: {},
      example: {
        amount: 100,
        bankCode: "000023",
        recipientAccountNumber: "0164387486",
        narration: "This is a test payment",
        requestId: "2921912900912092901329230",
      },
    },
    responses: [
      {
        status: 200,
        description: "Transfer initiated successfully",
        example: {
          reference: "249d86ac-db0a-4e9b-81e6-ee138520bbe0",
          status: "PENDING",
          destination: "",
          destinationName: "",
          requestId: "292191290091209222329230",
          responseCode: "9301",
          responseMessage: "Transaction pending: requery",
          amount: 100,
        },
      },
      {
        status: 400,
        description: "Invalid request parameters",
        example: {
          error: "Bad Request",
          message: "Invalid account number format",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request POST \\
  --url https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/transfer-funds \\
  --header 'Authorization: Bearer your-access-token' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "amount": 100,
    "bankCode": "000023",
    "recipientAccountNumber": "0164387486",
    "narration": "This is a test payment",
    "requestId": "2921912900912092901329230"
  }'`,
      },
      {
        language: "javascript",
        code: `const response = await fetch('https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/transfer-funds', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-access-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 100,
    bankCode: '000023',
    recipientAccountNumber: '0164387486',
    narration: 'This is a test payment',
    requestId: '2921912900912092901329230'
  })
});

const data = await response.json();
console.log(data.reference); // Transfer reference`,
      },
    ],
  },
  {
    id: "get-transfer-status",
    title: "Get Transfer Status",
    method: "GET",
    url: "{baseUrl}/bank/transfer/v1/transfer-status/reference/{requestId}",
    description:
      "Check the current status of a transfer using its request ID. Track whether the transfer is PENDING, COMPLETE, or FAILED.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "reference",
        type: "string",
        required: true,
        location: "path",
        description: "Transfer reference returned from initiate transfer",
        example: "2ad3a94f-d51a-4bd1-ab2a-e0b80c62e095",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Transfer status retrieved successfully",
        example: {
          reference: "249d86ac-db0a-4e9b-81e6-ee138520bbe0",
          status: "COMPLETE",
          destination: "0164386507",
          destinationName: "",
          requestId: "292191290091209222329230",
          responseCode: "00",
          responseMessage: "Transaction approved",
          amount: 100.0,
        },
      },
      {
        status: 404,
        description: "Transfer not found",
        example: {
          error: "Transfer not found",
          message: "No transfer found with the provided reference",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --request GET \\
  --url https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/transfer-status/reference/292191290091209222329230 \\
  --header 'Authorization: Bearer your-access-token'`,
      },
      {
        language: "javascript",
        code: `const reference = '2ad3a94f-d51a-4bd1-ab2a-e0b80c62e095';

const response = await fetch(\`https://staging.api.kiwifinance.tech/api/paas/bank/transfer/v1/transfer-status/reference\${requestId}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-access-token'
  }
});

const data = await response.json();
console.log(data.status); // Transfer status`,
      },
    ],
  },
];

export const accountEndpoints: ApiEndpoint[] = [
  {
    id: "reserve-account-details",
    title: "Get Reserve Account Details",
    method: "GET",
    url: "{baseUrl}/business/account/v2/reserve-account?accountNumber={accountNumber}",
    description: "Retrieve reserve account details using the account number.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "accountNumber",
        type: "string",
        required: true,
        location: "query",
        description: "The reserve account number to get details for",
        example: "9057169759",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Reserve account details",
        example: {
          firstname: "Nando Gota - Example Inc",
          accountNumber: "9057169759",
          status: "ACTIVE",
          balance: 4000.21,
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/business/account/v2/reserve-account?accountNumber=9057169759' \\
  --header 'Authorization: Bearer your-access-token'`,
      },
      {
        language: "javascript",
        code: `const accountNumber = '9057169759';

const response = await fetch(\`https://staging.api.kiwifinance.tech/api/paas/business/account/v2/reserve-account?accountNumber=\${accountNumber}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-access-token'
  }
});

const data = await response.json();
console.log(\`Account details:\`, data);`,
      },
    ],
  },
  {
    id: "single-account",
    title: "Get Account Balance",
    method: "GET",
    url: "{baseUrl}/business/account/v2/single?accountNumber={accountNumber}",
    description: "Retrieve account balance using the account number.",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        location: "header",
        description: "Bearer token obtained from authentication",
        example: "Bearer eyJhbGciOiJSUzI1NiJ9...",
      },
      {
        name: "accountNumber",
        type: "string",
        required: true,
        location: "query",
        description: "The account number to get balance for",
        example: "9057169759",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Single account balance information",
        example: {
          accountNumber: "9057169759",
          accountBalance: 4000.21,
        },
      },
      {
        status: 404,
        description: "Account not found",
        example: {
          error: "Account not found",
          message:
            "The specified account number does not exist or is not accessible",
        },
      },
    ],
    codeExamples: [
      {
        language: "curl",
        code: `curl --location 'https://staging.api.kiwifinance.tech/api/paas/business/account/v2/single?accountNumber=9057169759' \\
  --header 'Authorization: Bearer your-access-token'`,
      },
      {
        language: "javascript",
        code: `const accountNumber = '9057169759';

const response = await fetch(\`https://staging.api.kiwifinance.tech/api/paas/business/account/v2/single?accountNumber=\${accountNumber}\`, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-access-token'
  }
});

const data = await response.json();
console.log(\`Account Balance: ₦\${data.accountBalance.toLocaleString()}\`);`,
      },
    ],
  },
];
