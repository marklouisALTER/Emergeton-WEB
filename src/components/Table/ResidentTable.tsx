import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { Button, ConfigProvider, Input, Space, Table, Popconfirm } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { VscVerifiedFilled } from "react-icons/vsc";
import { useResidentsStore } from '@/store/Residents/useResidentsStore';
import { Authentication } from '@/Authentication/Authenticate';

type DepartmentTableType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  verified: boolean;
  contact_number: string;
  address: string;
  landmark: string;
  created_at: string;
}

type DataIndex = keyof DepartmentTableType;

export const ResidentTable:React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const { residents, isLoading, setResidentVerify } = useResidentsStore();

    const { getToken } = Authentication();
    const token = getToken();

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

  const sortResidentData = residents.sort((a, b) => a.verified === b.verified ? 0 : a.verified ? 1 : -1);


  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DepartmentTableType> => ({
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
  const columns: TableColumnsType<DepartmentTableType> = [
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      align: 'center',
      render: (verified) => (
          <div className='flex items-center justify-center'>{verified ? 
              <VscVerifiedFilled className='text-2xl text-green-500'/> :
              <VscVerifiedFilled className='text-2xl text-red-500'/>
          }</div>
      ),
  },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        ...getColumnSearchProps('first_name'),
        sorter: (a, b) => a.first_name.length - b.first_name.length,
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        ...getColumnSearchProps('last_name'),
        sorter: (a, b) => a.last_name.length - b.last_name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email'),
        sorter: (a, b) => a.email.length - b.email.length,
    },
    {
        title: 'Contact Number',
        dataIndex: 'contact_number',
        key: 'contact_number',
        ...getColumnSearchProps('contact_number'),
        sorter: (a, b) => a.contact_number.length - b.contact_number.length,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 300,
        ...getColumnSearchProps('address'),
        sorter: (a, b) => a.address.length - b.address.length,
    },
    {
        title: 'Landmark',
        dataIndex: 'landmark',
        key: 'landmark',
        ...getColumnSearchProps('landmark'),
        sorter: (a, b) => a.landmark.length - b.landmark.length,
    },
    {
        title: 'Action',
        key: 'action',
        width: 150,
        fixed: 'right',
        align: 'center',
        render: (record) => (
            <Space size={5}>
                <Popconfirm
                    title="Verify Resident"
                    description="Are you sure to verify this user?"
                    onConfirm={() =>  setResidentVerify(token, record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                   <Button type="primary" size='small' className='px-4 py-2 font-secondary text-xs' disabled={record.verified ? true : false}>{record.verified ? 'Verified' : 'Verify'}</Button>
                    {/* <Button type="primary" danger size='small' loading={isLoading}>Delete</Button> */}
                </Popconfirm>
            </Space>
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
      dataSource={sortResidentData}
      rowHoverable={true}
    />
  </ConfigProvider>
  )
}
