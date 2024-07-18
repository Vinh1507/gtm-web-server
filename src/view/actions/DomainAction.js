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
      domainList: data.resolvers,
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
      resolver: data.resolver,
      dataCenterHistory: data.dataCenterHistory,
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

  createResolver(data){
    return async (dispatch) => {
      try {
        dispatch({
          type: DomainConstant.CREATE_RESOLVER,
        });
        const response = await DomainService.createResolver(data);
        dispatch(this.createResolverSuccess(response.data));
      } catch (error) {
        console.log(error);
        dispatch(this.createResolverFailed(error));
      }
    };
  }

  createResolverSuccess(data){
    toast.success(
      `Create resolver ${data.domain.DomainName} successfully!`,
      {
        position: toast.POSITION.TOP_RIGHT,
        className: 'wrapper-messages messages-error',
      },
    );
    return {
      type: DomainConstant.CREATE_RESOLVER_SUCCESS,
    };
  }

  createResolverFailed(error){
    toast.error(
      `${error.message}`,
      {
        position: toast.POSITION.TOP_RIGHT,
        className: 'wrapper-messages messages-error',
      },
    );
    return {
      type: DomainConstant.CREATE_RESOLVER_FAILED,
      errorMessage: error.message,
    };
  }
}

const domainAction = new DomainActionClass();
export default domainAction;