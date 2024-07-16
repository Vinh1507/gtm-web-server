import { toast } from "react-toastify";
import DomainService from "../../services/DomainService";
import DomainConstant from "../constants/DomainConstant";
class DomainActionClass {
  getDomainList(data){
    return async (dispatch) => {
      try {
        dispatch({
          type: DomainConstant.GET_DOMAIN_LIST,
        });
        const response = await DomainService.getDomainList(data);
        dispatch(this.getDomainListSuccess(response.data));
      } catch (error) {
        console.log(error);
        dispatch(this.getDomainListSuccess(error));
      }
    };
  }
  getDomainListSuccess(data){
    return {
      type: DomainConstant.GET_DOMAIN_LIST_SUCCESS,
      contestList: data.items,
      pageInfo: data.page_info,
    };
  }

  getDomainListFailed(error){
    toast.error(
      `${error.message}`,
      {
        position: toast.POSITION.TOP_RIGHT,
        className: 'wrapper-messages messages-error',
      },
    );
    return {
      type: DomainConstant.GET_DOMAIN_LIST_FAILED,
    };
  }

  getDomainDetail(data){
    return async (dispatch) => {
      try {
        dispatch({
          type: DomainConstant.GET_DOMAIN_DETAIL,
        });
        const response = await DomainService.getDomainDetail(data);
        dispatch(this.getDomainDetailSuccess(response.data));
      } catch (error) {
        console.log(error);
        dispatch(this.getDomainDetailSuccess(error));
      }
    };
  }

  getDomainDetailSuccess(data){
    return {
      type: DomainConstant.GET_DOMAIN_DETAIL_SUCCESS,
      contestDetail: data.contest,
    };
  }

  getDomainDetailFailed(error){
    toast.error(
      `${error.message}`,
      {
        position: toast.POSITION.TOP_RIGHT,
        className: 'wrapper-messages messages-error',
      },
    );
    return {
      type: DomainConstant.GET_DOMAIN_DETAIL_FAILED,
    };
  }
}

const contestAction = new DomainActionClass();
export default contestAction;