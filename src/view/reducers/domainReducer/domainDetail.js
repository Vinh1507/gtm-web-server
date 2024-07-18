import DomainConstant from "../../constants/DomainConstant";
const initialState = {
  domainDetail: {},
  dataCenterHistory: [],
  isLoadingDomainDetail: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case DomainConstant.GET_DOMAIN_DETAIL: {
    return {
      ...state,
      isLoadingDomainDetail: true,
    };
  }
  case DomainConstant.GET_DOMAIN_DETAIL_SUCCESS: {
    return {
      ...state,
      isLoadingDomainDetail: false,
      domainDetail: action.resolver,
      dataCenterHistory: action.dataCenterHistory,
    };
  }
  case DomainConstant.GET_DOMAIN_DETAIL_FAILED: {
    return {
      ...state,
      isLoadingDomainDetail: false,
    };
  }
  default:
    return state;
  }
}
