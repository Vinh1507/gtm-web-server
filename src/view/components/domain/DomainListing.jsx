import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import domainAction from '../../actions/DomainAction';
import { Option } from 'antd/es/mentions';
import _ from 'lodash';
import { isValidIP } from '../../../utils/validateIP';
import { useNavigate } from 'react-router-dom';

function DomainListing() {
  const { domainList, isLoadingDomain, isCreatingResolver } = useSelector(state => state.domainReducer.domainList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(domainAction.getDomainList());
  }, []);

  const navigate = useNavigate();
  const handleResolverDetail = (id) => {
    navigate(`/domains/${id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolver, setResolver] = useState({
    domainName: '',
    policy: '',
    ttl: '',
  });

  const [dataCenters, setDataCenters] = useState([]);
  const [numberOfDC, setNumberOfDC] = useState(0);

  const openCreateResolverModal = () => {
    setIsModalOpen(true);
  };
  const handleCreateResolver = () => {
    const data = {
      ...resolver,
      dataCenters: dataCenters
    };
    console.log(data);
    dispatch(domainAction.createResolver(data));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'Domain',
      dataIndex: 'domainName',
      key: 'domainName',
    },
    {
      title: 'Policy',
      dataIndex: 'policy',
      key: 'policy',
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
      key: 'ttl',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      // eslint-disable-next-line no-unused-vars
      render: (_, item) => {
        return (
          <>
            <Button type="link" size="large" onClick={() => handleResolverDetail(item.id)}>
              Detail
            </Button>
          </>
        );
      },
    }
  ];

  const setDataCenterInfo = (index, key, value) => {
    const dataCenterData = _.cloneDeep(dataCenters);
    dataCenterData[index][key] = value;
    setDataCenters(dataCenterData);
  };

  const onChangeNumberOfDC = (value) => {
    setNumberOfDC(value);
  };

  useEffect(() => {
    const dataCenterData = [];
    const oldDataCenters = _.cloneDeep(dataCenters);
    for (let i = 0; i < numberOfDC; i++){
      if(oldDataCenters[i]){
        dataCenterData.push(oldDataCenters[i]);
      } else {
        dataCenterData.push({
          name: '',
          ip: null,
          healthCheckUrl: '',
          port: null,
          weight: 0,
        });
      }
    }
    setDataCenters(dataCenterData);
  }, [numberOfDC]);

  const validateIP = (_, value) => {
    if (!value){
      return Promise.resolve();
    }
    if (isValidIP(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid IP address!'));
  };

  const getDataCenterInfoTemplate = () => {
    return (
      <>
        {
          dataCenters.map((dc, index) => {
            console.log(dc);
            return (
              <>
                <Card style={{ marginTop: '20px' }}>
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                  >
                    <strong>Data center {index+1}</strong>
                    <Form.Item
                      label="Name"
                      name="Name"
                      rules={[{ required: true, message: 'Please input Name!' }]}
                    >
                      <Input value={dc.name} onChange={(event) => setDataCenterInfo(index, 'name', event.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      label="IP"
                      name="IP"
                      rules={[{ required: true, message: 'Please input IP!' }, { validator: validateIP }]}
                    >
                      <Input value={dc.ip} onChange={(event) => setDataCenterInfo(index, 'ip', event.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      label="HealthCheckUrl"
                      name="HealthCheckUrl"
                      rules={[{ required: true, message: 'Please input HealthCheckUrl!' }]}
                    >
                      <Input placeholder='/health' value={dc.healthCheckUrl} onChange={(event) => setDataCenterInfo(index, 'healthCheckUrl', event.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      label="Port"
                      name="Port"
                      rules={[{ required: true, message: 'Please input Port!' }]}
                    >
                      <InputNumber placeholder='8000' min={1} max={10000} value={dc.port} onChange={(value) => setDataCenterInfo(index, 'port', value)}/>
                    </Form.Item>
                    <Form.Item
                      label="Weight"
                      name="Weight"
                      rules={[{ required: true, message: 'Please input Weight!' }]}
                    >
                      <InputNumber placeholder='0' min={0} max={100} value={dc.weight} onChange={(value) => setDataCenterInfo(index, 'weight', value)}/>
                    </Form.Item>
                  </Form>
                </Card>
              </>
            );
          })
        }
      </>
    );
  }; 
  
  return (
    <div className="container" >
      <Button type="primary" onClick={openCreateResolverModal}>Create resolver</Button>
      <Table columns={columns} dataSource={domainList} loading={isLoadingDomain} />
      <Modal title="Create Resolver" open={isModalOpen} onOk={handleCreateResolver} onCancel={handleCancel} width={1400}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={isCreatingResolver}
            onClick={handleCreateResolver}
          >
            Create
          </Button>,
        ]}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Domain"
            name="domain"
            rules={[{ required: true, message: 'Please input your domain!' }]}
          >
            <Input value={resolver.domainName} onChange={(event) => setResolver({...resolver, domainName: event.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Policy"
            name="policy"
            rules={[{ required: true, message: 'Please select your policy!' }]}
          >
            <Select placeholder="Select a policy" value={resolver.policy} onChange={(value) => setResolver({...resolver, policy: value})}>
              <Option value="weightedRandomLoadBalancing">Weighted Random Load Balancing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="TTL"
            name="TTL"
            rules={[{ required: true, message: 'Please select your TTL!' }]}
          >
            <InputNumber min={0} max={10000000} value={resolver.ttl} onChange={(value) => setResolver({...resolver, ttl: value})}/>
          </Form.Item>

          <Form.Item
            label="Số lượng data center/ region"
            name="numberOfDC"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng data center/ region!' }]}
          >
            <InputNumber min={1} max={100} value={numberOfDC} onChange={(value) => onChangeNumberOfDC(value)} />
          </Form.Item>

          {getDataCenterInfoTemplate()}
        </Form>
      </Modal>
    </div>
  );
}
export default DomainListing;