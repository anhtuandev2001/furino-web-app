import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { HeaderMobile } from '../../common';
import OrderList from '../../common/OrderList/OrderList';
import { orderActions, selectOrders } from '../../store/order/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { statusDefault } from '../../utils/constants/status';

function Order() {
  const [value, setValue] = React.useState('0');
  const dispatch = useAppDispatch();

  const order = useAppSelector(selectOrders);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    dispatch(orderActions.onChangeStatusId(Number(newValue)));
  };

  React.useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  return (
    <div className='container px-4'>
      <HeaderMobile title='Order' />
      <div className='flex flex-col'>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
            >
              {statusDefault.map((status: any) => (
                <Tab
                  key={status.id}
                  label={status.name}
                  value={status.id.toString()}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel
            value={value}
            sx={{
              padding: '20px 0',
            }}
          >
            <OrderList order={order} />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
export default Order;
