import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { Button, ConfigProvider, Input, Space, Table } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useAlertStore } from '@/store/Alerts/useStoreAlerts';
import { useDispatchModalStore } from '@/store/Modal/useDispatchModal';
import { FaMapPin } from "react-icons/fa6";
import moment from 'moment';
import { useAlertModal } from '@/store/Alerts/useAlertModal';
type AlertHistoryDataType = {
    message: string;
    alert_type: string;
    alert_status: string;
    created_at: number;
    id: string;
    residentID: string;
    latitude: number;
    longitude: number;
    address: string;
    first_name: string;
    last_name: string;
}

type DataIndex = keyof AlertHistoryDataType;

export const AlertHistoryTable:React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const { alertData, isLoading } = useAlertStore();
    const { openModal } = useDispatchModalStore();
    const { openAlertModal } = useAlertModal();
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<AlertHistoryDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] ?? '').toString().toLowerCase().includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: TableColumnsType<AlertHistoryDataType> = [
    {
        title: 'Emergency Status',
        dataIndex: 'alert_status',
        key: 'alert_status',
        fixed: 'left',
        width: 150,
        sorter: (a, b) => a.alert_status.length - b.alert_status.length,
        render: (_, record) => {
            return (
            <div className='flex items-center justify-center'>
                <span className={`${record.alert_status === 'pending' ? 'bg-yellow-500' : record.alert_status === 'ongoing' ? 'bg-green-500' : 'bg-gray-300'} text-white px-2 py-1 rounded-md font-semibold`}>
                    {record.alert_status === 'pending' ? 'Pending' : record.alert_status === 'ongoing' ? 'Ongoing' : record.alert_status === 'dismissed' ? 'Dismissed' : 'Done'}
                </span>
            </div>
            )
        }
    },
    {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'full_name',
        render: (_, record) => {
            return `${record.first_name} ${record.last_name}`;
        }
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...getColumnSearchProps('address'),
        render: (_, record) => {
            const googleMapUrl = `https://www.google.com/maps?q=${record.latitude},${record.longitude}`;
            return (
                <a href={googleMapUrl} target="_blank" className='flex gap-2 hover:underline' rel="noopener noreferrer">
                    <FaMapPin className='text-red-500'/>
                    {record.address}
                </a>
            );
        },
    },
    {
        title: 'Date Created',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a, b) => a.created_at - b.created_at,
        render: (_, record) => {
            return moment(record.created_at, 'X').format('MMMM DD, YYYY');
        }
        
    },
    {
        title: 'Requested Alert Type',
        dataIndex: 'alert_type',
        key: 'alert_type',
        align: 'center',
        sorter: (a, b) => a.alert_type.length - b.alert_type.length,
        render: (_, record) => {
            return (
            <div className='flex items-center justify-center'>
                <span className={`${record.alert_type === 'fire' ? 'bg-red-500' : record.alert_type === 'police' ? 'bg-blue-500' : 'bg-green-500'} text-white px-2 py-1 rounded-md font-semibold`}>
                    {record.alert_type === 'fire' ? 'FIRE' : record.alert_type === 'police' ? 'POLICE' : 'MEDICAL'}
                </span>
            </div>
            )
        }
    },
    {
        title: 'Action',
        key: 'action',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: (record) => (
            // <Space size={5}>
            //     <Popconfirm
            //         title="Are you sure to send this alert?"
            //         description="Are you sure to verify this user?"
            //         onConfirm={() =>  console.log('clicked')}
            //         okText="Yes"
            //         cancelText="No"
            //     >
            <Space size={5}>
              <Button 
                type="default"
                onClick={() => openAlertModal(record.id)}
                >
                  Set Status
            </Button>
            <Button 
                type="primary" 
                onClick={() => openModal(record.id, record.alert_type)}
                size='small' 
                className='px-3 py-4 font-secondary text-xs' 
                disabled={record.alert_status === 'pending' ? false : true}>
                {record.alert_status === 'pending' ? 'Send Dispatch' : record.alert_status === 'ongoing' ? 'Ongoing' : record.alert_status === 'dismissed' ? 'Dismissed' : 'Done'}
            </Button>
            </Space>
            //     </Popconfirm>
            // </Space>
        )
    }
];


  return (
    <ConfigProvider
    theme={{
      components: {
        Table: {
          rowHoverBg: '#e5e7ea',
        },
      },
    }}
  >
    <Table 
      scroll={{ x: 1200 }}
      columns={columns} 
      loading={isLoading}
      pagination={{pageSize: 5}}
      dataSource={alertData}
      rowHoverable={true}
    />
  </ConfigProvider>
  )
}
