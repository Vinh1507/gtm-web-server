import ApiService from "./ApiService";
import DomainApiConstant from '../constants/api/DomainApiConstant';

class DomainServiceClass {
  async getDomainList(prefix = "") {
    const url = `${DomainApiConstant.GET_DOMAIN_LIST_URL}?prefix=${prefix}`;
    const response = await ApiService.get(url);
    console.log(response);
    return response;
  }
  async getDomainDetail(data) {
    if(!data) return null;
    const url = `${DomainApiConstant.GET_DOMAIN_LIST_URL}/${data.id}`;
    const response = await ApiService.get(url);
    return response;
  }
}

const DomainService = new DomainServiceClass();
export default DomainService;

