import ContestConstant from "../../constants/DomainConstant";
const initialState = {
  contestList: [],
  isLoadingContest: false,
  pageInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ContestConstant.GET_CONTEST_LIST: {
    return {
      ...state,
      isLoadingContest: true,
    };
  }
  case ContestConstant.GET_CONTEST_LIST_SUCCESS: {
    return {
      ...state,
      isLoadingContest: false,
      contestList: action.contestList,
      pageInfo: action.pageInfo,
    };
  }
  case ContestConstant.GET_CONTEST_LIST_FAILED: {
    return {
      ...state,
      isLoadingContest: false,
    };
  }
  default:
    return state;
  }
}
