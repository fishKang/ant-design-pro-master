import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProTable,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
// import { style } from '@umijs/bundler-esbuild/dist/plugins/style';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RETINFO) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RETINFO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RETINFO>();
  const [selectedRowsState, setSelectedRows] = useState<API.RETINFO[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<API.RETINFO>[] = [
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.updateForm.beginDate.dateLabel"
    //       defaultMessage="Begin date"
    //     />
    //   ),
    //   dataIndex: 'name',
    //   tip: 'The rule name is the unique key',
    //   render: (dom, entity) => {
    //     return (
    //       <a
    //         onClick={() => {
    //           setCurrentRow(entity);
    //           setShowDetail(true);
    //         }}
    //       >
    //         {dom}
    //       </a>
    //     );
    //   },
    // },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.serialNo.serialNoLabel" defaultMessage="Serial number" />,
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.customer.customerLabel" defaultMessage="Customer" />,
      dataIndex: 'customer',
      valueType: 'text',
      // ellipsis:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.plan.planLabel" defaultMessage="Plan number" />,
      dataIndex: 'plan',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.color.colorLabel" defaultMessage="Color number" />,
      dataIndex: 'colorcode',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.type.typeLabel" defaultMessage="Craft" />,
      dataIndex: 'type',
      valueType: 'text',
      valueEnum: {
        '散染': {
          text: (
            <FormattedMessage
              id="pages.searchTable.updateForm.craft.looseDyeingLabel"
              defaultMessage="Loose dyeing"
            />
          ),
        },
        '纱染': {
          text: (
            <FormattedMessage
              id="pages.searchTable.updateForm.craft.yarnDyeingLabel"
              defaultMessage="Yarn dyeing" />
          ),
        },
        '披染': {
          text: (
            <FormattedMessage
              id="pages.searchTable.updateForm.craft.shawlDyeingLabel"
              defaultMessage="Shawl dyeing" />
          ),
        },
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.craft.craftLabel" defaultMessage="Color number" />,
      dataIndex: 'material',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.plannedVolume.plannedVolumeLabel" defaultMessage="Planned volume" />,
      dataIndex: 'plannedvolume',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.netWeight.netWeightLabel" defaultMessage="Net weight" />,
      dataIndex: 'netweight',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.outboundDate.outboundDateLabel" defaultMessage="Outbound date" />,
      dataIndex: 'outbounddate',
      valueType: 'text',
      hideInSearch:true,
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.beginDate.dateLabel"
          defaultMessage="Begin date"
        />
      ),
      sorter: true,
      dataIndex: 'begindate',
      valueType: 'date',
      hideInTable:true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.endDate.dateLabel"
          defaultMessage="End date"
        />
      ),
      sorter: true,
      dataIndex: 'enddate',
      valueType: 'date',
      hideInTable:true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.createDate.dateLabel"
          defaultMessage="Create date"
        />
      ),
      sorter: true,
      dataIndex: 'createdate',
      valueType: 'date',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.createTime.timeLabel" defaultMessage="Create time" />,
      dataIndex: 'createtime',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.settlement.settlementLabel" defaultMessage="Settlement" />,
      dataIndex: 'settlementvolume',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.price.priceLabel" defaultMessage="Price" />,
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.amount.amountLabel" defaultMessage="Amount" />,
      dataIndex: 'amount',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.remark.remarkLabel" defaultMessage="Remark" />,
      dataIndex: 'remark',
      valueType: 'text',
      hideInSearch:true,
    },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.titleCallNo"
    //       defaultMessage="Number of service calls"
    //     />
    //   ),
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) =>
    //     `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.tenThousand',
    //       defaultMessage: ' 万 ',
    //     })}`,
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: (
    //         <FormattedMessage
    //           id="pages.searchTable.nameStatus.default"
    //           defaultMessage="Shut down"
    //         />
    //       ),
    //       status: 'Default',
    //     },
    //     1: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
    //       ),
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: (
    //         <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
    //       ),
    //       status: 'Success',
    //     },
    //     3: {
    //       text: (
    //         <FormattedMessage
    //           id="pages.searchTable.nameStatus.abnormal"
    //           defaultMessage="Abnormal"
    //         />
    //       ),
    //       status: 'Error',
    //     },
    //   },
    // },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.titleUpdatedAt"
    //       defaultMessage="Last scheduled time"
    //     />
    //   ),
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return (
    //         <Input
    //           {...rest}
    //           placeholder={intl.formatMessage({
    //             id: 'pages.searchTable.exception',
    //             defaultMessage: 'Please enter the reason for the exception!',
    //           })}
    //         />
    //       );
    //     }
    //     return defaultRender(item);
    //   },
    // },

    // {
    //   title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         handleUpdateModalOpen(true);
    //         setCurrentRow(record);
    //       }}
    //     >
    //       <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
    //     </a>,
    //     <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //       <FormattedMessage
    //         id="pages.searchTable.subscribeAlert"
    //         defaultMessage="Subscribe to alerts"
    //       />
    //     </a>,
    //   ],
    // },
  ];
  return (
    <PageContainer>
      <ProTable<API.RETINFO, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.queryForm.form.queryProcessingdtl',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={rule}
        columns={columns}

        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.form.createProcessingdtl',
          defaultMessage: 'New rule',
        })}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        width="500px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RETINFO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >

        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.createForm.form.createProcessingdtl"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="sm"
          name="customer"
          label={'客户名称'}
          // labelAlign={'left'}
          // addonBefore={'客户名称'}
        />
        <ProFormText
          width="sm"
          name="plan"
          label={'计划号'}
          colProps={{
            span: 200,
          }}
        />
        <ProFormText
          width="sm"
          name="colorcode"
          label={'色号'}
        />
        <ProFormText
          width="sm"
          name="type"
          label={'类型'}
        />
        <ProFormText
          width="sm"
          name="material"
          label={'原料/规格'}
        />
        <ProFormText
          width="sm"
          name="plannedvolume"
          label={'计划量'}
        />
        <ProFormText
          width="sm"
          name="netweight"
          label={'净重'}
        />
        <ProFormText
          width="sm"
          name="outbounddate"
          label={'出库日期'}
        />
        <ProFormDigit
          width="sm"
          name="settlementvolume"
          // name={['settlementvolume', 'number']}
          label={'结算量'}
          initialValue={'0'}
        />
        <ProFormDigit
          width="sm"
          name="price"
          // name={['price', 'number']}
          label={'单价'}
          initialValue={'0'}
        />
        {/*<ProFormMoney*/}
        {/*  width="sm"*/}
        {/*  name="amount"*/}
        {/*  label={'金额'}*/}
        {/*  initialValue={1}*/}
        {/*/>*/}

        <ProFormDependency name={['settlementvolume', 'price']}>
          {({ settlementvolume, price }) => {
            return (
              <ProFormDigit
                label={'金额'}
                width="sm"
                // name="amount"
                name={'amount'}
                // disabled
                // initialValue={'123'}
                // label={`${settlementvolume?.value + price?.value || ''}`}
                placeholder={`${(settlementvolume * price)} `}
                // defaultValue = {`${(settlementvolume?.number * price?.number)} `}

              />
            );
          }}
        </ProFormDependency>
        <ProFormText
          width="sm"
          // grid='true'
          name="type"
          label={'类型'}

        />
        <ProFormText
          width="sm"
          name="remark"
          label={'备注'}
        />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<API.RETINFO>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.RETINFO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
