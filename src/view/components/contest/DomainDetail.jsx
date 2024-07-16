import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import contestAction from '../../actions/DomainAction';
import { useNavigate, useParams } from 'react-router-dom';

function DomainDetail(){
  const {contestDetail, isLoadingDomainDetail} = useSelector(state => state.contestReducer.contestDetail);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    if(!id){
      return;
    }
    dispatch(contestAction.getDomainDetail({id}));
  }, [id]);


  const navigate = useNavigate();
  function handleClickIssue(code){
    dispatch(contestAction.setIssueLoading(true));
    navigate('issues/' + code);
  }
  
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (_, item) => <a href="" style={{fontSize: '18px', textDecoration: 'none'}} onClick={() => handleClickIssue(item.code)}>{item.title.toUpperCase()}</a>,
    },
  ];

  const getStatusColor = (item) => {
    const data = contestDetail.contest_issues.find(contest_issue => contest_issue.issue.code === item.code);
    const status = data.submitStatus;
    if (status === 1) return 'submition submit-accepted-bg';
    if (status === 2) return 'submition submit-wrong-bg'; 
    return 'submition';
  };
  return (
    <div className="container">
      <Table 
        columns={columns} 
        dataSource={contestDetail?.contest_issues?.map(item => item.issue)} 
        rowClassName={(record) => getStatusColor(record)}
        loading={isLoadingDomainDetail} 
        pagination={false}/>
    </div>
  );
}
export default DomainDetail;