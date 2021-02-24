import wireBox from "./Group 43wireBox.jpg";

const initState = {
  status: {
    requesting: {
      connections: false,
      contacts: false,
    },
    requested: {
      connections: true,
      contacts: true,
    },
    timestamps: {
      connections: 1614048737678,
      contacts: 1614048737678,
    },
  },
  data: {
    connections: {
      "123": {
        serverToken:
          "1@E+CKggXs7jhTf2clR/I3RUfXXSqbF0Nt6vhiZ6j+699IDQnigtmym8Id1y9jDeWdW324xWVdrcsVpA==",
        clientToken: "mNuuNICcfkGNcMdeIBhLPkrAWpRhxytE4jxe/aURy0o=",
        macKey: "RYsdUl/i0V5OzwYwuCK+Ehbrzcdya9nFRdTnan55Stw=",
        user: {
          imgUrl:
            "https://pps.whatsapp.net/v/t61.24694-24/106786643_677999013044897_809060459687394430_n.jpg?oh=e7e194126f699f86a70537ad63ab8a2b&oe=601418A6",
          name: "Brian Stefanovich",
          jid: "59894419518@s.whatsapp.net",
          phone: {
            mnc: "007",
            wa_version: "2.20.206.24",
            mcc: "748",
            device_manufacturer: "HUAWEI",
            device_model: "HWDRA-MG",
            os_build_number: "DRA-LX3 1.0.0.178(C469)",
            os_version: "8.1.0",
          },
        },
        encKey: "X4wkq1XMdqgorKPIAA7hfDvzYa1cnhRKXt8fvlMqMso=",
        clientID: "zyC/qClmf115N01lGuRMGQ==",
      },
    },
    contacts: {
      "demo.csv": {
        variables: ["phone", "name", "testVariable1", "testVariable2"],
        length: 2,
      },
    },
  },
  ordered: {
    connections: [
      {
        id: "Demo Connection",
        serverToken:
          "1@E+CKggXs7jhTf2clR/I3RUfXXSqbF0Nt6vhiZ6j+699IDQnigtmym8Id1y9jDeWdW324xWVdrcsVpA==",
        clientToken: "mNuuNICcfkGNcMdeIBhLPkrAWpRhxytE4jxe/aURy0o=",
        macKey: "RYsdUl/i0V5OzwYwuCK+Ehbrzcdya9nFRdTnan55Stw=",
        user: {
          imgUrl: wireBox,
          name: "Brian Stefanovich",
          jid: "59894419518@s.whatsapp.net",
          phone: {
            mnc: "007",
            wa_version: "2.20.206.24",
            mcc: "748",
            device_manufacturer: "HUAWEI",
            device_model: "HWDRA-MG",
            os_build_number: "DRA-LX3 1.0.0.178(C469)",
            os_version: "8.1.0",
          },
        },
        encKey: "X4wkq1XMdqgorKPIAA7hfDvzYa1cnhRKXt8fvlMqMso=",
        clientID: "zyC/qClmf115N01lGuRMGQ==",
      },
    ],
    contacts: [
      {
        id: "Demo-List.csv",
        variables: ["phone", "name", "testVariable1", "testVariable2"],
        length: 2,
      },
    ],
  },
  listeners: {
    byId: {
      connections: {
        name: "connections",
      },
      contacts: {
        name: "contacts",
      },
    },
    allIds: ["connections", "contacts"],
  },
  errors: {
    byQuery: {},
    allIds: [],
  },
  queries: {},
};

const fakeFireStoreReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

export default fakeFireStoreReducer;
