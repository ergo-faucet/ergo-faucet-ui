'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

const MainGridSearchParamsSync = ({
  entriesPerPage,
  setEntriesPerPage,
  setCurrentPage,
  setSortField,
  setSortOrder,
  setSelectedPackageId,
  selectedPackageId,
  setDidInitFromUrl,
}: {
  entriesPerPage: number;
  setEntriesPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
  setSortField: (v: 'name' | 'releaseDate') => void;
  setSortOrder: (v: 'asc' | 'desc') => void;
  setSelectedPackageId: (v: string) => void;
  selectedPackageId: string;
  didInitFromUrl: boolean;
  setDidInitFromUrl: (v: boolean) => void;
}) => {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const pageParam = sp.get('page');
    const perPageParam = sp.get('perPage');
    const sortParam = sp.get('sort');
    const orderParam = sp.get('order');
    const selectedParam = sp.get('selected');

    const allowedPerPage = [10, 20, 50];

    if (perPageParam) {
      const per = parseInt(perPageParam);
      if (allowedPerPage.includes(per)) {
        if (per !== entriesPerPage) setEntriesPerPage(per);
      } else {
        if (entriesPerPage !== 10) setEntriesPerPage(10);
      }
    }
    if (pageParam) {
      const pageNum = Math.max(1, parseInt(pageParam));
      if (!Number.isNaN(pageNum)) setCurrentPage(pageNum);
    }
    if (sortParam === 'name' || sortParam === 'releaseDate') {
      setSortField(sortParam);
    }
    if (orderParam === 'asc' || orderParam === 'desc') {
      setSortOrder(orderParam);
    }
    if (selectedParam) {
      setSelectedPackageId(selectedParam);
    }
    setDidInitFromUrl(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const selectedParam = sp.get('selected') || '';
    if (selectedParam !== selectedPackageId) {
      setSelectedPackageId(selectedParam);
    }
  }, [searchParams, selectedPackageId, setSelectedPackageId]);

  return null;
};

export default MainGridSearchParamsSync;
