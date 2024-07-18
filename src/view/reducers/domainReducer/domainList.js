import DomainConstant from "../../constants/DomainConstant";
const initialState = {
  domainList: [],
  isLoadingDomain: false,
  pageInfo: {},
  isCreatingResolver: false,
  createResolverErrorMessage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case DomainConstant.GET_DOMAIN_LIST: {
    return {
      ...state,
      isLoadingDomain: true,
    };
  }
  case DomainConstant.GET_DOMAIN_LIST_SUCCESS: {
    return {
      ...state,
      isLoadingDomain: false,
      domainList: action.domainList,
      pageInfo: action.pageInfo,
    };
  }
  case DomainConstant.GET_DOMAIN_LIST_FAILED: {
    return {
      ...state,
      isLoadingDomain: false,
    };
  }
  case DomainConstant.CREATE_RESOLVER: {
    return {
      ...state,
      isCreatingResolver: true,
      createResolverErrorMessage: null,
    };
  }
  case DomainConstant.CREATE_RESOLVER_SUCCESS: {
    return {
      ...state,
      isCreatingResolver: false,
      createResolverErrorMessage: null,
    };
  }
  case DomainConstant.CREATE_RESOLVER_FAILED: {
    return {
      ...state,
      isCreatingResolver: false,
      createResolverErrorMessage: action.errorMessage,
    };
  }
  default:
    return state;
  }
}
