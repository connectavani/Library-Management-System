  // components/DynamicTable.tsx
  import React, { useMemo, useState } from 'react';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Input } from '@/components/ui/input';
  import { cn } from '@/lib/utils';

  export type Column<T> = {
    key: keyof T;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
  };

  type DynamicTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    rowsPerPage?: number;
    searchPlaceholder?: string;
    customSearch?: (row: T, search: string) => boolean;
  };

  export function DynamicTable<T extends { id: string | number }>({
    data,
    columns,
    rowsPerPage = 10,
    searchPlaceholder = 'Search...',
    customSearch,
  }: DynamicTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
      if (!searchTerm) return data;
      return data.filter((row) =>
        customSearch
          ? customSearch(row, searchTerm)
          : Object.values(row).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase()), 
            ),
      );
    }, [data, searchTerm, customSearch]);

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * rowsPerPage;
      return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);


    return (
      <div className='w-full space-y-6 pt-4'>
        {/* Search */}
        <div className='flex items-center justify-end'>
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className='w-full sm:max-w-xs'
          />
        </div>

        {/* Table */}
        <div className='border rounded-2xl shadow-sm overflow-hidden'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={cn(
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                    )}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow key={row.id} className='hover:bg-muted/30 transition'>
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={cn(
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='text-center py-8'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }     
