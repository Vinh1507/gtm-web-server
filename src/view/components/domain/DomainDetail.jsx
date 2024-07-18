import React, { useEffect } from 'react';
import { Tabs, Table } from 'antd';
import domainAction from '../../actions/DomainAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading.jsx';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

function DomainDetail(){
  const { domainDetail, dataCenterHistory, isLoadingDomainDetail } = useSelector(state => state.domainReducer.domainDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(domainAction.getDomainDetail({id}));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      title: 'Data Center',
      dataIndex: 'dataCenterName',
      key: 'dataCenterName',
    },
    {
      title: 'Health Check Url',
      dataIndex: 'healthCheckUrl',
      key: 'healthCheckUrl',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Response Code',
      dataIndex: 'responseCode',
      key: 'responseCode',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss A Z'),
    },
  ];
  if (isLoadingDomainDetail && !domainDetail) {
    return <Loading />;
  }

  console.log(dataCenterHistory);
  return (
    <>
      <div className="container" >
        <Tabs>
          <TabPane tab="Resolver Info" key="1">
            <div>
              <p><strong>Domain Name:</strong> {domainDetail.domainName}</p>
              <p><strong>TTL:</strong> {domainDetail.ttl} second(s)</p>
              <p><strong>Policy:</strong> {domainDetail.policy}</p>
            </div>
          </TabPane>
          <TabPane tab="Resolver History" key="2">
            <Table dataSource={dataCenterHistory} columns={columns} pagination={false} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
export default DomainDetail;