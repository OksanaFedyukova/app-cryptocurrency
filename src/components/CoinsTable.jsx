
import React from 'react';
import {useState, useEffect} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import { Box } from '@mui/material';
  import {cryptoData} from '../cryptoData.json'


  
const CoinsTable = () => {

  
    const formatCurrency = (value) => (value ? `$${value}` : 'Невідомо');
    const formatPercentage = (value) => (value ? `${value}%` : 'Невідомо');
    const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'Невідомо');
  
  const columns = React.useMemo(
    () => [
        {accessorKey: 'coinInfo', 
        header: 'Назва',
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              src={row.original.image.small || 'placeholder-url'}
              alt={row.original.name}
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
            <span>{row.original.name}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'market_data.current_price.usd',
        header: 'Ціна (USD)',
        Cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        accessorKey: 'market_data.total_volume.usd',
        header: 'Ринковий обсяг (USD)',
        Cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        accessorKey: 'market_data.price_change_percentage_24h',
        header: 'Зміни за 24 години (%)',
        Cell: ({ cell }) => formatPercentage(cell.getValue()),
      },
      {
        accessorKey: 'market_data.circulating_supply',
        header: 'Всього в обігу',
      },
      {
        accessorKey: 'market_data.circulating_supply',
        header: 'ATH Ціна (USD)',
        Cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        accessorKey: 'market_data.market_cap_change_percentage_24h',
        header: 'ATH Зміни (%)',
        Cell: ({ cell }) => formatPercentage(cell.getValue()),
      },
      {
        accessorKey: 'last_updated',
        header: 'ATH Дата',
        Cell: ({ cell }) => formatDate(cell.getValue()),
      },
      {
        accessorKey: 'block_time_in_minutes',
        header: 'Блок-час (хв)',
      },
      {
        accessorKey: 'market_data.total_volume.usd',
        header: 'Ринковий обсяг 24г (USD)',
        Cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
      {
        accessorKey: 'market_data.high_24h.usd',
        header: 'Макс. ціна 24г (USD)',
        Cell: ({ cell }) => formatCurrency(cell.getValue()),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: cryptoData || [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: false,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default CoinsTable;
