import ContestConstant from "../../constants/DomainConstant";
const initialState = {
  contestDetail: {},
  isLoadingContestDetail: false,
  pageInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
  case ContestConstant.GET_CONTEST_DETAIL: {
    return {
      ...state,
      isLoadingContestDetail: true,
    };
  }
  case ContestConstant.GET_CONTEST_DETAIL_SUCCESS: {
    return {
      ...state,
      isLoadingContestDetail: false,
      contestDetail: action.contestDetail,
      pageInfo: action.pageInfo,
    };
  }
  case ContestConstant.GET_CONTEST_DETAIL_FAILED: {
    return {
      ...state,
      isLoadingContestDetail: false,
    };
  }
  default:
    return state;
  }
}
