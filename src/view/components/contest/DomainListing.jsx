import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import contestAction from '../../actions/DomainAction';
import { useNavigate } from 'react-router-dom';

function DomainListing(){
  const {contestList, isLoadingDomain} = useSelector(state => state.contestReducer.contestList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contestAction.getDomainList());
  }, []);

  const navigate = useNavigate();
  const handleParticipateDomain = (id) => {
    navigate(`/contests/${id}`);
  };

  console.log("contest List", contestList);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'openTime',
      key: 'openTime',
    },
    {
      title: 'Kết thúc',
      dataIndex: 'closeTime',
      key: 'closeTime',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      // eslint-disable-next-line no-unused-vars
      render: (_, item) => {
        return (
          <>
            <Button type="primary" size="large" onClick={() => handleParticipateDomain(item.id)}>
              Bắt đầu
            </Button>
          </>
        );
      },
    }
  ];
  return (
    <div className="container">
      <Table columns={columns} dataSource={contestList} loading={isLoadingDomain}/>
    </div>
  );
}
export default DomainListing;