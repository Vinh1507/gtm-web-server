import DomainConstant from "../../constants/DomainConstant";
const initialState = {
  domainDetail: {},
  isLoadingDomainDetail: false,
  pageInfo: {},
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
      domainDetail: action.domainDetail,
      pageInfo: action.pageInfo,
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
