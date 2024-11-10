import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { Button, ConfigProvider, Input, Space, Table, Popconfirm, message } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useDepartmentTable } from '@/store/Department/useDepartmentTable';
import { Authentication } from '@/Authentication/Authenticate';

type DepartmentTableType = {
    id: number;
    name: string;
    email: string;
    contact_number: string;
    address: string;
    status: string;
    tags:  string;
    created_at?: string;
}

type DataIndex = keyof DepartmentTableType;

export const DepartmentTable:React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const { data, isLoading, deleteData } = useDepartmentTable();
    const { getToken } = Authentication();
    const token = getToken();

    const removeRecord = (id: number) => {
        deleteData(id, token);
        return message.success('Record deleted successfully');
    }

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      fixed: 'left',
      render: (_, record) => (
        <div className='flex items-center justify-center'>
            <span className={`${record.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded-md font-semibold`}>
                {record.status === 'available' ? 'AVAILABLE' : 'DISPATCHED'}
            </span>
        </div>
      )
  },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
        width: 150,
        fixed: 'left',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Contact Number',
        dataIndex: 'contact_number',
        key: 'contact_number',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 300,
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (_, record) => (
          <div className='flex items-center justify-center'>
              <span className={`${record.tags === 'fire' ? 'bg-red-500' : record.tags === 'police' ? 'bg-blue-500' : 'bg-green-500'} text-white px-2 py-1 rounded-md font-semibold`}>
                  {record.tags === 'fire' ? 'FIRE' : record.tags === 'police' ? 'POLICE' : 'MEDICAL'}
              </span>
          </div>
        )
    },
    {
        title: 'Date Created',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Action',
        key: 'action',
        width: 150,
        fixed: 'right',
        align: 'center',
        render: (record) => (
            <Space size={5}>
                <Button type="primary" size='small'>Edit</Button>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => removeRecord(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger size='small' loading={isLoading}>Delete</Button>
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
      dataSource={data}
      rowHoverable={true}
    />
  </ConfigProvider>
  )
}
